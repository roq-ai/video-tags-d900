import * as yup from 'yup';

export const keywordValidationSchema = yup.object().shape({
  name: yup.string().required(),
  business_id: yup.string().nullable(),
});
