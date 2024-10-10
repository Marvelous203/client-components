"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema"
import authApiRequest from "@/apiRequest/auth"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/app/AppProvider"




export default function RegisterForm() {
  const {setSessionToken} = useAppContext()

  const router = useRouter()

    // 1. Define your form.
    const form = useForm<RegisterBodyType>({
      resolver: zodResolver(RegisterBody),
      defaultValues: {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: RegisterBodyType) {
      try {
        const result = await authApiRequest.register(values)
        toast({
          title: "Login successful",
          description: result.payload.message,
        })    
        await authApiRequest.auth({sessionToken: result.payload.data.token})
          
        setSessionToken(result.payload.data.token);
        router.replace('/me')
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const errors = error.payload?.errors as { field: string, message: string }[];
        const status = error.status as number;
        
        if (status === 422 && errors?.length) {
          errors.forEach((error) => {
            form.setError(error.field as ('email' | 'password'), {
              type: 'server',
              message: error.message
            });
          });
        } else {
          // Log other types of errors
          toast({
            title: "Error",
            description: error.payload.message,
            variant: "destructive"
          })        
        }
      }
    }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[700px] flex-shrink-0 w-full"
      noValidate={false}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="!mt-8 w-full">Register</Button>
      </form>
    </Form>
)
}
