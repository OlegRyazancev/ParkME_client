import React, {useState} from 'react';
import ActBtn from "../UI/Button/ActBtn";

const UserForm = ({onSubmit, user, validation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    const handleSubmit = () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            setValidationMessage('Please fill in all fields');
            return;
        }
        const userData = {
            id: user.id,
            name: name,
            email: email,
            password: password
        }
        onSubmit(userData)
        setName('');
        setEmail('');
        setPassword('');
        setValidationMessage('')
    }

    return (
        <div>
            <div>
                <span>Enter new name or keep current: </span>
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name}
                    defaultValue={user?.name}
                />
            </div>
            <div>
                <span>Enter new email or keep current: </span>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    value={email}
                    defaultValue={user?.email}
                />
            </div>
            <div>
                <span>Enter old/new password: </span>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                />
            </div>
            <p>
                {validationMessage
                    ? validationMessage
                    : validation}
            </p>
            <ActBtn action={handleSubmit} label={'save'}/>
        </div>

    );
};

export default UserForm;