import { useState } from 'react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import FormCol from '../../ui/FormCol';
import useLogin from '../../hooks/useLogin';
import SpinnerMini from '../../ui/SpinnerMini';
import FormRowVertical from '../../ui/FormRowVertical';

function LoginForm() {
    const [email, setEmail] = useState('tasnam@gmail.com');
    const [password, setPassword] = useState('12345678');
    const { login, isPending } = useLogin();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) return;
        login({ email, password }, {
            onSettled() {
                setEmail('');
                setPassword('');
            }
        });
    }

    return (
        <FormCol onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    disabled={isPending}
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    disabled={isPending}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button disabled={isPending} size="large">
                    {isPending ? <SpinnerMini /> : 'Login'}
                </Button>
            </FormRowVertical>
        </FormCol>
    );
}

export default LoginForm;
