import useSettings from '../../hooks/useSettings';
import useUpdateSetting from '../../hooks/useUpdateSetting';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
    const { isPending, settings } = useSettings();
    const { editSetting, isUpdating } = useUpdateSetting();

    if(isPending) {
        return <Spinner/>
    }

    const handleUpdate = function(value, key) {
        if(settings[key] == value || !value) {
            return
        }
        editSetting({ [key]: value });
    }

    return (
        <Form> 
            <FormRow label="Minimum nights/booking">
                <Input disabled={ isUpdating } type="number" id="min-nights" defaultValue={settings.minBookingLength} onBlur={e => handleUpdate(e.target.value, 'minBookingLength')}/>
            </FormRow>
            <FormRow label="Maximum nights/booking">
                <Input disabled={ isUpdating } type="number" id="max-nights" defaultValue={settings.maxBookingLength}/>
            </FormRow>
            <FormRow label="Maximum guests/booking">
                <Input disabled={ isUpdating } type="number" id="max-guests" defaultValue={settings.maxGuestsPerBooking}/>
            </FormRow>
            <FormRow label="Breakfast price">
                <Input disabled={ isUpdating } type="number" id="breakfast-price" defaultValue={settings.breakfastPrice}/>
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
