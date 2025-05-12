"use client";

import { auth } from '@/auth';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/ui/formInput';
import { profileEditFormValues } from '@/types/profile';
import { profileEditForm } from '@/schema/profile';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Page() {

  const form = useForm<profileEditFormValues>({
    resolver: zodResolver(profileEditForm),
    defaultValues: {
      name: '',
      username: ''
    }
  });
  return (
    <div className="flex flex-col text-white justify-center h-[100dvh] items-center gap-10">
      <Form {...form}>
        <form>
          <div className="min-w-44">
            <FormInput formControl={form.control} name="name" placeholder={'Name'} label="Name" />
          </div>
          <div className="min-w-44">
            <p>email</p>
          </div>
        </form>
      </Form>
    </div>
  );
}
