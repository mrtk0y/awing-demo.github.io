import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Fragment, useState } from 'react';
import CustomTabPanel from './components/CustomTabs';
import Information from './components/Information';
import Campaign from './components/Campaign';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import { FormProvider, useForm } from 'react-hook-form';
import { isEmpty } from './utils/isEmptyObject';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

enum FORMS {
  INFORMATION,
  CAMPAIGN
}


const schema = z.object({
  name: z.string().min(1, { message: 'Bắt buộc' }),
  childCampaign: z.array(z.object({
    name: z.string().min(1, { message: 'Bắt buộc' }),
    advertisement: z.array(z.object({
      quantity: z.number().min(1, { message: 'Số phải lớn hơn 0' }),
      name: z.string().min(1, { message: 'Bắt buộc' })
    }))
  })).nonempty({ message: 'Bắt buộc' })
});

export type TFormData = {
  name: string
  id: string
  description: string
  childCampaign: TChildCampaign[]
}

export type FormFields = z.infer<typeof schema>

export type TChildCampaign = {
  name: string
  id: string
  advertisement: {
    id: number
    quantity: number
    name: string
  }[]
}
function App() {

  const [activeTab, setActiveTab] = useState(FORMS.CAMPAIGN)


  const method = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      childCampaign: [
        {
          name: "Chiến dịch 1",
          isActive: true,
          advertisement: [
            {
              id: 1,
              quantity: 0,
              name: "Quảng cáo 1"
            }
          ]
        }
      ]
    },
  })


  const { handleSubmit, control, formState: { errors, }, watch, } = method



  const onSubmit = (values: unknown) => {
    console.log('!!values', values, isEmpty(errors));
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <Box paddingY={1}>
      <Box display={'flex'} justifyContent={'end'} paddingX={2}>
        <Button type="submit" variant="contained"
          onClick={() => {
            handleSubmit(onSubmit)()
          }}
        >Submit</Button>
      </Box>

      <Box marginY={2} >
        <Divider />
      </Box>

      <Box margin={2} boxShadow={1}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_e, value) => setActiveTab(value)} aria-label="basic tabs example">
            <Tab label="Thông tin" />
            <Tab label="Chiến dịch con" />
          </Tabs>
        </Box>

        <FormProvider {...method}>


          <Fragment>
            <CustomTabPanel value={activeTab} index={FORMS.INFORMATION}>
              <Information control={control} errors={errors} />
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={FORMS.CAMPAIGN}>
              <Campaign
                control={control}
                watch={watch}
              />
            </CustomTabPanel>
          </Fragment>
        </FormProvider>
      </Box>
    </Box>
  )
}

export default App
