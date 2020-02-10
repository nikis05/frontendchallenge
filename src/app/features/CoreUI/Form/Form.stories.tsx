import React, { FC, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import '../../App/Root/Root.scss';
import FormInput from '../FormInput/FormInput';
import TwoColumnGrid from '../TwoColumnGrid/TwoColumnGrid';
import Label from '../Label/Label';
import Button from '../Button/Button';
import Toggle from '../Toggle/Toggle';
import Checkbox from '../Checkbox/Checkbox';
import Select from '../Select/Select';

export default { title: 'Form' };

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  marketing: boolean;
  marketing2: boolean;
  weeklytips: boolean;
  newfeatures: boolean;
}

interface Props {
  onSubmit: (data: FormData) => void;
}

const Form: FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, errors, control } = useForm();
  const mapSubmitHandler = useCallback(data => onSubmit(data), [onSubmit]);

  return (
    <form onSubmit={handleSubmit(mapSubmitHandler)}>
      <TwoColumnGrid>
        <FormInput
          fillWidth
          label="Firstname *"
          name="firstname"
          ref={register({ required: true })}
          error={errors.firstname && 'First name is required.'}
        />
        <FormInput
          fillWidth
          label="Lastname *"
          name="lastname"
          ref={register({ required: true })}
          error={errors.lastname && 'Last name is required.'}
        />
        <Label title="Marketing 2">
          <Toggle
            name="weeklytips"
            label="Send me weekly tips to help me improve the engagement on my store"
            ref={register({})}
          />
        </Label>
        <FormInput
          fillWidth
          label="Phone Number"
          name="phone"
          ref={register({})}
        />
        <FormInput
          fillWidth
          label="E-Mail *"
          name="email"
          type="email"
          ref={register({ required: true })}
          error={errors.email && 'E-Mail is required.'}
        />
        <Toggle
          name="newfeatures"
          label="I want to be the first to hear about new features"
          defaultValue
          ref={register({})}
        />
        <Controller
          name="checkbox"
          control={control}
          as={Checkbox}
          options={[
            { key: '1', label: 'One' },
            { key: '2', label: 'Two' },
            { key: '3', label: 'Three' }
          ]}
          defaultValue={false}
          label="Label"
        />
        <Controller
          name="select"
          control={control}
          as={Select}
          options={[
            { key: '1', label: 'One' },
            { key: '2', label: 'Two' },
            { key: '3', label: 'Three' }
          ]}
          defaultValue={null}
        />
        <Controller
          name="select-many"
          control={control}
          as={Select}
          options={[
            { key: '1', label: 'One' },
            { key: '2', label: 'Two' },
            { key: '3', label: 'Three' }
          ]}
          defaultValue={[]}
        />
        <Button size="big" type="submit">
          Submit
        </Button>
      </TwoColumnGrid>
    </form>
  );
};

export const normal = () => <Form onSubmit={action('submit')} />;
