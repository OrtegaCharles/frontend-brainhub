import React, { useRef, useState } from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import { TabView, TabPanel } from 'primereact/tabview';
import { useHistory } from "react-router";
import { UserService } from "../service/UserService";
import moment from 'moment';
import 'primeflex/primeflex.css';

const UserForm = (props) => {
    const [firstName, setFirstName] = useState(props.location.state.user.firstName !== undefined ? props.location.state.user.firstName : null);
    const [lastName, setLastName] = useState(props.location.state.user.lastName !== undefined ? props.location.state.user.lastName : null);
    const [email, setEmail] = useState(props.location.state.user.email !== undefined ? props.location.state.user.email : null);
    const [birthday, setBirthday] = useState(props.location.state.user.birthday !== undefined ? moment(props.location.state.user.birthday).toDate() : null);
    const [visibleProgress, setVisibleProgress] = useState('none');
    const [visibleBtn, setVisibleBtn] = useState('block');
    const history = useHistory();
    const params = props.location.state;
    let toast = useRef(null);
    
    const changeVisibility = (spinner, btn) => {
        setVisibleProgress(spinner);
        setVisibleBtn(btn);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        changeVisibility("block", "none");
        
        if (!event.target.checkValidity() || birthday === null) {
            toast.current.show({ severity: 'warn', summary: "Warning", detail: "Fill in all the fields" });
            changeVisibility("none", "block");
            return;
        }

        const data = new FormData(event.target);

        if (params.user === 'create') {
            UserService.createUser(data, birthday).then((res) => {
                changeVisibility("none", "block");
                toast.current.show({ severity: 'success', summary: "Success", detail: res.message });
                history.goBack();
            }).catch(e => {
                changeVisibility("none", "block");
                toast.current.show({ severity: 'error', summary: "Error", detail: e.response.data.error });
            });
        }
        else {
            UserService.updateUser(params.user.id, data, birthday).then((res) => {
                changeVisibility("none", "block");
                toast.current.show({ severity: 'success', summary: "Success", detail: res.message });
                history.goBack();
            }).catch(e => {
                changeVisibility("none", "block");
                toast.current.show({ severity: 'error', summary: "Error", detail: e.response.data.error });
            });
        }
    };

    return <div>
        <Toast ref={toast}></Toast>
        <div className="card">
            <TabView className="p-col-12">
                <TabPanel header={params.title} leftIcon="pi-md-location-city">
                    <form onSubmit={handleSubmit} noValidate>
                        <Panel header='User information' toggleable={true}>
                            <div className="p-grid form-group p-col-12 p-md-12">
                                <div className="p-col-12 p-md-3">
                                    <label>First Name </label>
                                    <InputText value={firstName} name='firstName' id='firstName'
                                        onChange={(e) => setFirstName(e.target.value.toUpperCase())}
                                        readOnly={(params.disabled)} style={{ textColor: "#000" }} required />

                                </div>
                                <div className="p-col-12 p-md-3">
                                    <label>Last Name </label>
                                    <InputText value={lastName} name='lastName' id='lastName'
                                        onChange={(e) => setLastName(e.target.value.toUpperCase())}
                                        readOnly={(params.disabled)} style={{ textColor: "#000" }} required />
                                </div>
                                <div className="p-col-12 p-md-3">
                                    <label>Email </label>
                                    <InputText value={email} name='email' id='email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        readOnly={(params.disabled)} style={{ textColor: "#000" }} required />
                                </div>
                                <div className="p-col-12 p-md-3">
                                    <label>Birthday </label>
                                    <Calendar name='birthday' id='birthday' value={birthday} onChange={(e) => setBirthday(e.value)} dateFormat="yy/mm/dd" readOnlyInput disabled={params.disabled} required></Calendar>
                                </div>
                            </div>
                        </Panel><br />
                        <ProgressSpinner style={{ float: 'right', width: '50px', height: '50px', display: visibleProgress }} strokeWidth="8" />
                        <Button type="submit" style={{ float: 'right', display: visibleBtn }} label="Save" className="pink-btn" icon="pi pi-save" disabled={params.disabled} />
                        <Button type="button" style={{ float: 'right', display: visibleBtn }} label="Go back" className="teal-btn" icon="pi pi-arrow-left" onClick={() => history.goBack()} />
                        <br />
                    </form>
                </TabPanel>
            </TabView><br />
        </div>
    </div>
}
export default UserForm;