

// ** Icon Imports
import { Icon, IconProps } from '@iconify/react'
import { Grid, GridSize, GridSpacing } from '@mui/material'
import { AnyObjectSchema } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, UseFormProps, useForm } from 'react-hook-form'
import React from 'react'
import omit from 'lodash/omit';
import keys from 'lodash/keys';
const GRID_FULL_WIDTH = 12

type InputData = {
  name: string
  ele?: any
  plainEle?: React.ReactNode
  col?: GridSize
  isHidden?: boolean
  disabled?: boolean
}
interface FormContainerProps {
  inputs: InputData[]
  onSubmit: (data: any) => void
  schema: AnyObjectSchema
  formOptions?: UseFormProps
  spacing?: GridSpacing
}

const addPropsToInput =
  (props: any, InputComponent: any) =>
  ({ field }: any) => {
    // TODO: investigate is ref of react hook necessary
    const rest = omit(field, ['ref'])
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <InputComponent {...props} {...rest} />
  }

const FormContainer = ({ inputs, schema, onSubmit, formOptions, spacing = 4 }: FormContainerProps) => {
  const schemaOptions = schema ? { resolver: yupResolver(schema) } : {}
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields }
  } = useForm({
    mode: 'onBlur',
    ...formOptions,
    ...schemaOptions
  })
  const formatDataBeforeSubmit = (formData: any) => {
    const formatedData = keys(formData).reduce(
      (acc, key) => ({
        ...acc,
        [key]: typeof formData[key] === 'string' ? formData[key].trim() : formData[key]
      }),
      {}
    )
    onSubmit(formatedData)
  }
  return (
    <form onSubmit={handleSubmit(formatDataBeforeSubmit)}>
      <Grid container spacing={spacing} className={`FormContainer ${isDirty ? 'form-dirty' : ''}`}>
        {inputs.map(({ name, ele, plainEle, col, isHidden = false, disabled = false }: InputData) => (
          <React.Fragment key={name}>
            {isHidden ? null : (
              <>
                {plainEle && (
                  <div
                    style={{
                      padding: `0 ${(spacing as number) * 8}px`,
                      width: '100%'
                    }}
                  >
                    {plainEle}
                  </div>
                )}
                {ele && (
                  <Grid item xs={GRID_FULL_WIDTH} sm={col || GRID_FULL_WIDTH} className={disabled ? 'disabled' : ''}>
                    <Controller
                      defaultValue=''
                      control={control}
                      name={name}
                      render={addPropsToInput(
                        {
                          error: Boolean(errors?.[name]),
                          helperText: errors?.[name]?.message
                        },
                        ele
                      )}
                    />
                  </Grid>
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </form>
  )
}

export default FormContainer
