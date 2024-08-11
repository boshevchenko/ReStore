import { Typography, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import AppCheckbox from "../../app/components/AppCheckbox";

export default function AddressForm() {
    const { control, formState } = useFormContext();
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='fullName' label="Full Name" />
                    {/* <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    /> */}
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                    />
                </Grid> */}
                <Grid item xs={12}>
                    <AppTextInput control={control} name='address1' label="Address line 1" />
                    {/* <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                    /> */}
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput control={control} name='address2' label="Address line 2" />
                    {/* <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                    /> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='city' label="City" />
                    {/* <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                    /> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='state' label="State" />
                    {/* <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        variant="standard"
                    /> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='zip' label="Zip" />
                    {/* <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                    /> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='country' label="Country" />
                    {/* <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                    /> */}
                </Grid>
                <Grid item xs={12}>
                    <AppCheckbox
                        disabled={!formState.isDirty}
                        name='saveAddress'
                        label='Save this as default address'
                    />
                    {/* <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    /> */}
                </Grid>
            </Grid>
        </>
    );
}
