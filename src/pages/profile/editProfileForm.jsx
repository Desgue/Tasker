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
    username: z.string().min(2).max(50),
    email: z.string().email(),
})

const EditProfileForm = ({className, user, attributes}) => {
  
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: user.username,
            email: attributes.email,
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} className="w-3/5 lg:w-1/2"/>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
                <Input placeholder="youremail@provider.com" {...field} className="w-3/5 lg:w-1/2"/>
              </FormControl>
              <FormDescription>
                This is your email address.
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

export default EditProfileForm