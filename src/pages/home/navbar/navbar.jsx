import '../navbar/navbar.scss';
import { Button } from '@mui/material';
import { useRef, useState } from 'react';
import { useTodoData } from '../../../data/TodoDataContext';

export default function Navbar() {
    const { data, setData } = useTodoData();

    const nameRef = useRef();
    const taskRef = useRef();
    const emailRef = useRef();
    const depRef = useRef();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEmployee = {
            id: data.length + 1,
            fullName: nameRef.current.value,
            task: taskRef.current.value,
            email: emailRef.current.value,
            department: depRef.current.value,
        };

        let newData = [...data];
        newData.unshift(newEmployee);
        setData(newData);

        nameRef.current.value = '';
        taskRef.current.value = '';
        emailRef.current.value = '';
        depRef.current.value = '';

        setIsModalOpen(false);
    };

    const searchUser = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filteredData = data.filter((emp) =>
            emp.fullName.toLowerCase().includes(query)
        );

        setData(filteredData);
    };

    return (
        <div className="navbar">
            {isModalOpen && <div className="backdrop" onClick={() => setIsModalOpen(false)} />}
            <div className="container">
                <div className="navbar_row">
                    <input
                        type="text"
                        className="navbar_row_input"
                        placeholder="Search"
                        onChange={searchUser}
                    />
                    <Button
                        className='navbar_row_btn'
                        children={'Add'}
                        color='success'
                        variant="contained"
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>

                <div
                    className="add_modal"
                    style={{ display: isModalOpen ? 'flex' : 'none' }}
                >
                    <input
                        ref={nameRef}
                        type="text"
                        className="navbar_row_input add_modal_input"
                        placeholder="Full Name"
                    />
                    <input
                        ref={taskRef}
                        type="text"
                        className="navbar_row_input add_modal_input"
                        placeholder="Task"
                    />
                    <input
                        ref={emailRef}
                        type="text"
                        className="navbar_row_input add_modal_input"
                        placeholder="Email"
                    />
                    <input
                        ref={depRef}
                        type="text"
                        className="navbar_row_input add_modal_input"
                        placeholder="Department"
                    />

                    <Button
                        className='add_btn'
                        variant='outlined'
                        children={'Close'}
                        onClick={() => setIsModalOpen(false)}
                    />
                    <Button
                        className='add_btn'
                        variant='outlined'
                        children={'Save'}
                        color="success"
                        onClick={handleSubmit}
                    />
                </div>

            </div>
        </div>
    );
}
