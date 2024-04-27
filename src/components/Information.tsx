

import  {  useCallback, useEffect   } from 'react'
import { useForm } from 'react-hook-form'
type Props = {
  isSubmitting: boolean
  handleSetSubmit :()=>void
}
const Information = ({handleSetSubmit,isSubmitting}:Props) => {
  const { register ,handleSubmit} = useForm()


  const onSubmit = useCallback(
    (values: unknown) => {
      // form submit action here
      console.log('!!values', values);
      try {
        //
      } catch (err) {
        //
      } finally {
        handleSetSubmit()
      }
    },
    [handleSetSubmit]
  )



  useEffect(() => {
    if(isSubmitting){
      handleSubmit(onSubmit)()
    }
  }, [handleSubmit, isSubmitting, onSubmit])


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input {...register("firstName")} />
      <label>Gender Selection</label>

      {/* <Button  type="submit" variant="contained"  >Submit</Button> */}

  </form>
  )
}

export default Information
