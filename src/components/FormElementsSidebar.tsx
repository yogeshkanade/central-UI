import SidebarBtnElement from './SidebarBtnElement'
import { FormElements } from './FormElements'

const FormElementsSidebar = () => {
  return (
    <div>
        Elements
<SidebarBtnElement formElement={FormElements.TextField}/>
    </div>
  )
}

export default FormElementsSidebar
