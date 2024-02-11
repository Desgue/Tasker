import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    password: z.string().min(8),
    
})


const ChangePasswordForm = ({className}) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
        },
      })
    function onSubmit(data) {
        console.log(data)
    }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={ `${className} space-y-8 `}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} type="password" />
              </FormControl>
              <FormDescription>
                Change your password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default ChangePasswordForm