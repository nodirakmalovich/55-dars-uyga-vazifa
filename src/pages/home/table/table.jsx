import '../table/table.scss';
import { Button } from '@mui/material';
import { useRef, useState } from 'react';
import { useTodoData } from '../../../data/TodoDataContext';

export default function Table() {
    const { data, setData } = useTodoData();

    const nameRef = useRef();
    const taskRef = useRef();
    const emailRef = useRef();
    const depRef = useRef();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);

    const handleEditClick = (emp) => {
        setIsModalOpen(true);
        setCurrentEditId(emp.id);
        nameRef.current.value = emp.fullName;
        taskRef.current.value = emp.task;
        emailRef.current.value = emp.email;
        depRef.current.value = emp.department;
    };

    const editUser = () => {
        const updatedData = data.map((emp) =>
            emp.id === currentEditId
                ? {
                    ...emp,
                    fullName: nameRef.current.value,
                    task: taskRef.current.value,
                    email: emailRef.current.value,
                    department: depRef.current.value,
                }
                : emp
        );

        setData(updatedData);
        setIsModalOpen(false);
    };

    const deleteUser = (id) => {
        const updatedData = data.filter((emp) => emp.id !== id);
        setData(updatedData);
    }

    return (
        <div className="container">
            {isModalOpen && <div className="backdrop" onClick={() => setIsModalOpen(false)} />}

            <div
                className="edit_modal"
                style={{ display: isModalOpen ? 'flex' : 'none' }}
            >
                <input
                    ref={nameRef}
                    type="text"
                    className="navbar_row_input edit_modal_input"
                    placeholder="Full Name"
                />
                <input
                    ref={taskRef}
                    type="text"
                    className="navbar_row_input edit_modal_input"
                    placeholder="Task"
                />
                <input
                    ref={emailRef}
                    type="text"
                    className="navbar_row_input edit_modal_input"
                    placeholder="Email"
                />
                <input
                    ref={depRef}
                    type="text"
                    className="navbar_row_input edit_modal_input"
                    placeholder="Department"
                />

                <Button
                    className='edit_btn'
                    variant="outlined"
                    children={"Close"}
                    onClick={() => setIsModalOpen(false)}
                />
                <Button
                    className='edit_btn'
                    variant="outlined"
                    children={"Save"}
                    color="success"
                    onClick={editUser}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th className='table_num'>№</th>
                        <th className='table_name'>Full Name</th>
                        <th className='table_dep'>Department</th>
                        <th>Task</th>
                        <th className='table_email'>Email</th>
                        <th className='table_actions'>Edite / Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((emp, index) => {
                        return (
                            <tr key={emp.id}>
                                <td className='table_num'>{index + 1}</td>
                                <td className='table_name'>{emp.fullName}</td>
                                <td className='table_dep'>{emp.department}</td>
                                <td>{emp.task}</td>
                                <td className='table_email'>{emp.email}</td>
                                <td>
                                    <Button
                                        className='table_btn'
                                        children={"Edit"}
                                        variant="outlined"
                                        onClick={() => handleEditClick(emp)}
                                    />
                                    <Button
                                        className='table_btn'
                                        children={"Delete"}
                                        variant="outlined"
                                        color="error"
                                        onClick={() => deleteUser(emp.id)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

