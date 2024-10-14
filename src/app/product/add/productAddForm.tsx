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
import { useToast } from "@/hooks/use-toast"
// import { useRouter } from "next/navigation"
import { handleErrorApi } from "@/lib/utils"
import { useState } from "react"
import { CreateProductBody, CreateProductBodyType } from "@/schemaValidations/product.schema"
import productApiRequest from "@/apiRequest/product"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"





export default function ProductAddForm() {
    const [file,setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
//   const router = useRouter()

    // 1. Define your form.
    const form = useForm<CreateProductBodyType>({
      resolver: zodResolver(CreateProductBody),
      defaultValues: {
        name: '',
        price: 0,
        description: '',
        image: '',
      },
    })
    
   
    async function onSubmit(values: CreateProductBodyType) {
      if(loading) return
      setLoading(true)
      try {
        const formData = new FormData()
        formData.append('file', file as Blob)
        const uploadImgResult = await productApiRequest.uploadImg(formData)
        const imgUrl = uploadImgResult.payload.data
        const result = await productApiRequest.create({...values,
            image: imgUrl
        })
        toast({
          description: result.payload.message,
        })    
        // router.push('/products')
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {  
        handleErrorApi({
          error,
          setError: form.setError
        })
      }finally{
        setLoading(false)
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
                <Input placeholder="ten" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Img</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={(e)=>{
                    const file = e.target.files?.[0]
                    if(file){
                        setFile(file)
                        field.onChange('http:localhost:3000/'+file.name)
                    }
                }}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          {file && (
            <div>
            <Image src={URL.createObjectURL(file)}
            width={128}
            height={128}
            alt="preview"
            className="w-32 h-32 object-cover"
            />
            <Button type="button" variant={'destructive'} size={'sm'} 
            onClick={()=>{
                setFile(null);
                form.setValue('image', '')
            }}
            >Delete</Button>
            </div>

          )}          
        <Button type="submit" className="!mt-8 w-full">Add</Button>
      </form>
    </Form>
)
}
