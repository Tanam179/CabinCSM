import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormCol from '../../ui/FormCol';
import FormVertical from '../../ui/FormVertical';
import Input from '../../ui/Input';
import useSignup from '../../hooks/useSignup';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm();

    const { signupApi, isPending } = useSignup();

    const onSubmit = function (data) {
        signupApi({ fullName: data.fullName, email: data.email, password: data.password }, { onSettled() { reset() } });
    };

    return (
        <FormCol onSubmit={handleSubmit(onSubmit)}>
            <FormVertical label="Full name" error={''}>
                <Input disabled={isPending} type="text" id="fullName" {...register('fullName', { required: 'Full name is required' })} />
            </FormVertical>

            <FormVertical label="Email address" error={''}>
                <Input
                disabled={isPending}
                    type="email"
                    id="email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Please provide a valid email address',
                        },
                    })}
                />
            </FormVertical>

            <FormVertical label="Password (min 8 characters)" error={''}>
                <Input disabled={isPending} type="password" id="password" {...register('password', { required: 'Password is required' })} />
            </FormVertical>

            <FormVertical label="Repeat password" error={''}>
                <Input
                disabled={isPending}
                    type="password"
                    id="passwordConfirm"
                    {...register('passwordConfirm', {
                        required: 'This field is required',
                        validate(value) {
                            return value === getValues().password || 'Password comfirm is not match';
                        },
                    })}
                />
            </FormVertical>

            {/* type is an HTML attribute! */}
            <Button disabled={isPending} variation="secondary" type="reset">
                Cancel
            </Button>
            <Button disabled={isPending}>Create new user</Button>
        </FormCol>
    );
}

export default SignupForm;
