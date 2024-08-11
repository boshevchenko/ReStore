import * as yup from 'yup';

export const validationSchema = [
    yup.object({
        fullName: yup.string().required('Full name is required'),
        address1: yup.string().required('Address1 name is required'),
        address2: yup.string().required('Address2 name is required'),
        city: yup.string().required('City name is required'),
        state: yup.string().required('State name is required'),
        zip: yup.string().required('Zip name is required'),
        country: yup.string().required('Country name is required')
    }),
    yup.object(),
    yup.object({
        nameOnCard: yup.string().required('Name on card is required')
    })
]