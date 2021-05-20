import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { UserService } from '../service/UserService';
import { setUsers, deleteUsers } from '../redux/actions/userActions'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'
import { useHistory } from 'react-router';
import { Toast } from 'primereact/toast';

const User = () => {
    const history = useHistory();
    const [user, setUser] = useState(null)
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    let toast = useRef(null);

    useEffect(() => {
        UserService.getUsers().then((res) => {
            dispatch(setUsers(res));
        }).catch(e => {
            toast.current.show({ severity: 'error', summary: "Error", detail: e.response.data.error });
        });
    }, []);

    const goToUserForm = (rowData, accion) => {
        let user = "", title = "";
        let isDisplay = false;
        (accion === "create") ? user = "create" : user = rowData;
        (accion === "create") ? title = 'New user' : title = 'Update user';
        (accion === "show") ? isDisplay = true : isDisplay = false;
        if (accion === "show")
            title = 'User details';

        history.push({
            pathname: '/create_user',
            state: {
                title: title,
                user: user,
                disabled: isDisplay
            }
        });
    }

    const deleteUser = (rowData) => {
        UserService.deleteUser(rowData.id).then((res) => {
            toast.current.show({ severity: 'success', summary: "Success", detail: res.message });
            dispatch(deleteUsers(rowData));
        }).catch(e => {
            console.log(e)
            toast.current.show({ severity: 'error', summary: "Error", detail: e.response.data.error });
        });
    }

    const actionTemplate = (rowData, column) => {
        return <div>
            <Button type="button" icon="pi pi-search" className="p-button-success" style={{ marginRight: '.5em', width: '2.290em', height: '2.290em' }} tooltip='details' tooltipOptions={{ position: 'top' }} onClick={() => goToUserForm(rowData, "show")}></Button>
            <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginRight: '.5em', width: '2.290em', height: '2.290em' }} tooltip='edit' tooltipOptions={{ position: 'top' }} onClick={() => goToUserForm(rowData, "edit")}></Button>
            <Button type="button" icon="pi pi-trash" className="p-button-danger" style={{ marginRight: '.5em', width: '2.290em', height: '2.290em' }} tooltip='delete' tooltipOptions={{ position: 'top' }} onClick={() => deleteUser(rowData)}></Button>
        </div>
    }

    const footer = () => {
        return <div className="" style={{ width: '100%' }}>
            <Button style={{ float: 'left' }} label='New user' className="pink-btn" icon="pi pi-plus" onClick={() => goToUserForm("", "create")} />
        </div>;
    }

    return (
        <div>
            <Toast ref={toast}></Toast>
            <DataTable value={users} selectionMode="single" rows={10} footer={footer()} emptyMessage='No records found'
                responsive={true} selection={user} onSelectionChange={event => setUser(event.value)}>
                <Column field="firstName" header="First Name"></Column>
                <Column field="lastName" header="Last Name"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="birthday" header="Birthday"></Column>
                <Column header="Actions" body={actionTemplate}></Column>
            </DataTable>
        </div>
    )
}
export default User;