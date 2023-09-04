import { Alert, Box, Button, Card, CardActions, CardContent, CircularProgress, FormControl, FormLabel, TextField } from "@mui/material"
import { SignInResponse, signIn, signOut, useSession } from "next-auth/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import type { NextPage } from "next";
import { styled } from '@mui/material/styles';
import classes from './LoginBox.module.css';
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import classNames from "classnames";

const VALIDATION_OBJECT = {
    email: {
        required:"*Email is required",
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "*Invalid email address"
        }
    },
    password: {
        required:"*Password is required",
        maxLength: {
            value: 16,
            message: "*Max length is 16"
        },
        minLength: {
            value: 6,
            message: "*Min length is 6"
        }
    }
}

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
        borderColor: '#E0E3E7',
        },
        '&:hover fieldset': {
        borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
        borderColor: '#6F7E8C',
        },
    },
});

interface FormInputs {
    email: string
    password: string
 }

const LoginBox:NextPage = () => {
    const router:NextRouter = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [actionMessage, setActionMessage] = useState<string | null>(null);
    const onSubmit: SubmitHandler<FormInputs> = (data:any) => {
        setLoading(true);
        setActionMessage(null);
        signIn("credentials", {
            ...data,
            redirect:false,
            callbackUrl: "/dashboard",
        }).then((res:SignInResponse | undefined)=> {
            if(res !== undefined) {
                if(res.ok === true) {
                    if(res.url) {
                        router.push(res.url);
                        return;
                    }
                } else {
                    if(res.error) {
                        setActionMessage(res.error);    
                    } else {
                        setActionMessage("Opps!! Something went wrong.");    
                    }
                }
                //handle errors
            }
            setLoading(false);
        });
    }
    
    const { 
        handleSubmit, 
        control, 
        reset, 
        trigger, 
        formState: { errors },} = useForm<FormInputs>({
            defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
       
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardContent classes={{root: classes.muiRootCardContent}}>
                    <FormControl classes={{root: classes.muiRootFormControl}}>
                        <Controller
                            name="email"
                            control={control}
                            rules={VALIDATION_OBJECT.email}
                            render={({ field }) => <CssTextField {...field} label="Email" placeholder="Email"/>}
                        />
                        {errors.email && <span className="form-field-validation-error">{errors.email.message}</span>}
                    </FormControl>
                    <FormControl classes={{root: classes.muiRootFormControl}}>
                        <Controller
                            name="password"
                            control={control}
                            rules={VALIDATION_OBJECT.password}
                            render={({ field }) => <CssTextField {...field} type="password" label="Password" placeholder="Password"/>}
                        />
                        {errors.password && <span className="form-field-validation-error">{errors.password.message}</span>}
                    </FormControl>
                    <Box className={classNames("form-field-validation-error",classes.textAlignCenter)}>{actionMessage}</Box>
                </CardContent>
                <CardActions classes={{root:classes.muiRootCardActions}}>
                    <Button 
                        variant="contained"
                        onClick={(event: React.SyntheticEvent) => trigger()}
                        type="submit"
                        disabled={loading}
                    >
                        {loading? <CircularProgress color="inherit" size={20}/> : 'Sign In'}
                    </Button>
                </CardActions>
            </Card>
        </form>
    )
}

export default LoginBox