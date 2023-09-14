import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

export default function AddCustomer() {
    const [formValues, setFormValues] = useState([]);
    const router = useRouter();
    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Full Name is required'),
        phone: Yup.string().required('Phone Number is required'),
        address: Yup.string().required('Address is required'),
    });
    const initialValues = {
        fullName: '',
        phone: '',
        address: '',
    };

    useEffect(() => {
        const storedValues = localStorage.getItem('formValues');
        if (storedValues) {
            setFormValues(JSON.parse(storedValues));
        }
    }, []);

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        const updatedFormValues = [...formValues, values];
        localStorage.setItem('formValues', JSON.stringify(updatedFormValues));
        setFormValues(updatedFormValues);
        resetForm();
        setSubmitting(false);
        router.push('/Customers');
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: 'url("/images/background-image.jpg")',
                }
                }>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="bg-white dark:bg-black/70 bg-opacity-90 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                            <div className="mb-6 text-center">
                                <h1 className="text-2xl font-semibold text-emerald-500">Add New Customer</h1>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="fullName" className="block text-emerald-700 text-sm font-bold mb-2">Full Name</label>
                                <Field type="text" className="w-full rounded-lg border-emerald-200 text-emerald-700 bg-white focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 px-3 py-2" id="fullName" name="fullName" />
                                <ErrorMessage name="fullName" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-emerald-700 text-sm font-bold mb-2">Phone</label>
                                <Field type="text" className="w-full rounded-lg border-emerald-200 text-emerald-700 bg-white focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 px-3 py-2" id="phone" name="phone" />
                                <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="address" className="block text-emerald-700 text-sm font-bold mb-2">Address</label>
                                <Field type="text" className="w-full rounded-lg border-emerald-200 text-emerald-700 bg-white focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 px-3 py-2" id="address" name="address" />
                                <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div className="mb-6 text-center">
                                <button
                                    type="submit"
                                    className={`bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded ${isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Adding...' : 'Add New'}
                                </button>
                            </div>

                            <div className="text-center">
                                <Link legacyBehavior href='/Customers'>
                                    <a className="text-blue-500 hover:text-blue-700 text-sm">Back to Customers</a>
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div >
            <Footer />
        </>
    );
}
