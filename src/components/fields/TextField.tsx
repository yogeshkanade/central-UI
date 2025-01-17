import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance } from "../FormElements";
import {z} from "zod"
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {Form,
    FormControl,
FormDescription,
FormField,
FormItem,
FormLabel,
FormMessage
} from "../ui/form"
import {Input} from "../ui/input"
import useDesigner from "../hooks/useDesigner";


const type:ElementsType="TextField";

const extraAttributes={
    label:"Text Field",
    helperText:"Helper Text",
    required:false,
    placeholder:"Value here...",
}
const propertiesSchema = z.object({
    label:z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeholder: z.string().min(2).max(200)
})
export const TextFieldFormElement:FormElement={
    type,
construct:(id:string)=>({
    id,
    type,
    extraAttributes,
}),
designerBtnElelemnts:{
    icon: MdTextFields,
    label:"Text Field",
},

    designerComponent:DesignerComponent,
    formComponent:()=><div>Form Component</div>,
    porpertiesComponent:PropertiesComponent,
}

type CustomInstance=FormElementInstance&{
    extraAttributes: typeof extraAttributes;
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({elementInstance}:{elementInstance:FormElementInstance}){
    const element = elementInstance as CustomInstance
    const {updateElement }=useDesigner();
    const form = useForm<propertiesFormSchemaType>({
        mode:"onBlur",
        defaultValues:{
            label:element.extraAttributes.label,
            helperText:element.extraAttributes.helperText,
            required:element.extraAttributes.required,
            placeholder:element.extraAttributes.placeholder
        }
    })
    useEffect(()=>{
        form.reset(element.extraAttributes)
    },[element,form])
    function applyChanges(values: propertiesFormSchemaType){
        const {label, helperText, placeholder,required}= values;
updateElement(element.id,{
    ...element,
    extraAttributes:{
        label, helperText, placeholder,required
    }
})
    }
  return (
    <Form {...form}>
 <form action="" onSubmit={(e)=>{
e.preventDefault()
  }} onBlur={form.handleSubmit(applyChanges)} className="space-y-3">
<FormField
control={form.control}
name='label'
render={({field})=>(
    <FormItem>
        <FormLabel>Label: </FormLabel>
        <FormControl><Input {...field} className="bg-transparent text-white border p-1 mr-2 rounded-md"/></FormControl>
        <FormDescription>
            The label of the field. <br/> It will be displayed above the field
        </FormDescription>
        <FormMessage/>
    </FormItem>
)}
/>
  </form>
    </Form>
  )
}

function DesignerComponent({elementInstance}:{elementInstance:FormElementInstance}){
    const element = elementInstance as CustomInstance
    const {label,required,placeholder,helperText}=element.extraAttributes;
    return (
        <div className="bg-foreground rounded-md p-2 flex flex-col gap-2 w-full">
            <label htmlFor="">{label}{required&& "*"}</label>
            <input className="rounded-md bg-transparent border p-1 w-full" type="text" readOnly disabled placeholder={placeholder} />
            {helperText&& (
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            )}
            </div>
    )
}