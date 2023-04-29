---
layout: ../../layouts/Layout.astro
title: Creating Controlled Forms with React Hook Forms
author: Rohan Samuel
description: Take a deep dive into the concepts of Bluetooth Low Energy and learn how to scan for bluetooth devices, connect, and transfer data between a mobile app and a BLE peripheral
image:
  url: "/images/posts/react-hook-pirate.png"
  alt: "Pirate with a hook typing on a keyboard"
pubDate: 2022-06-24
# draft: false
---

# Creating Controlled Forms with React Hook Forms

# Overview

React Hook Forms is a form library for React applications to build forms with easy to configure validation through the process of calling hooks to build form state and context. React Hook Forms serve as an alternative to another popular form library, Formik. The use cases for React Hook Forms is how easy it is to handle event handlers such as `onSubmit`, `onChange`, `onBlur` etc. In addition, it is a really lightweight package with zero dependencies, and can have easy integration with component libraries.

In my opinion, it is an easy library to work with due to the documentation being easy to navigate as well as the flexibility of form control that is provided - a developer can develop basic forms with default html input fields, or they can develop complex forms with programatic behaviour that uses both custom, in-built and external components.

# Creating a form in React without a form library

Let’s walk through creating a registration form for a site using React and TypeScript:

1. First let’s initialise our file to create the form.

```jsx
export const BetaMaleForm = (): JSX.Element => {
  return <></>;
};
```

2. Now let’s add our input fields required for the registration form. In this example, we will have a username, password, and email fields, with a submit button to post the form.

```jsx
export const BetaMaleForm = (): JSX.Element => {
  return (
    <form onSubmit={handleSubmit}>
      <Label>
        Username:
        <input type="text" name="username" />
      </Label>
      <Label>
        Password:
        <input type="password" name="password" />
      </Label>
      <Label>
        Email:
        <input type="email" name="fullName" />
      </Label>
    </form>
  );
};
```

3. Then, we will need to implement some storage to hold the values each field will contain.

```jsx
export const BetaMaleForm = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form onSubmit={handleSubmit}>
      <Label>
        Username:
        <input type="text" name="username" value={username} />
      </Label>
      <Label>
        Password:
        <input type="password" name="password" value={password} />
      </Label>
      <Label>
        Email:
        <input type="email" name="fullName" value={email} />
      </Label>
    </form>
  );
};
```

4. Finally, when the user types, we need to be able to take their updates and apply them to the field value by capturing change events

```tsx
export const BetaMaleForm = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    alert(`Username: ${username}, Password: ${password}, Email: ${email}`);
  };

  const handleUsernameChange = (e: ChangeEvent) => setUsername(e.target.value);

  const handlePasswordChange = (e: ChangeEvent) => setPassword(e.target.value);

  const handleEmailChange = (e: ChangeEvent) => setEmail(e.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <Label>
        Username:
        <input
          type="text"
          name="username"
          onChange={handleUsernameChange}
          value={username}
        />
      </Label>
      <Label>
        Password:
        <input
          type="password"
          name="password"
          onChange={handlePasswordChange}
          value={password}
        />
      </Label>
      <Label>
        Email:
        <input
          type="email"
          name="fullName"
          onChange={handleEmailChange}
          value={email}
        />
      </Label>
    </form>
  );
};
```

We’re done! We’ve created a registration form using React using the in-built hooks to handle storage and capturing change. However, imagine that over time when you need to manage this file you will need to add more fields to the file. This would mean more `useState` hooks, and then more `onChange` handlers to write. This would increase the length of our component file and would contribute to unreadability

A risk of this component file is that the more fields that need to be added to the form, the more handlers and state that need to be created - this will only get worse if a form needs advanced behaviours such as key press handlers for each field, predictive text functionality, and functionality to focus the next field.

# Using React Hook Forms

Now we have seen how to build a form using React’s in built hooks, let’s do the same thing but using the React Hook Form library. I’ll take you through this incrementally.

The first function that needs to be called to initialise our form is the `useForm` hook. This hook’s main purpose is to set up the form management and state that react hook form provides aka. state management and event handlers.

The `useForm` hook will return useful properties to help us handle form behaviour. This object is what we call `methods` which contains several useful functions the developer can use to initialise the form management

```tsx
const methods = useForm();
```

Let’s go through the hooks provided by the form and rebuild the form we’ve created from the start. First we’ll add the `useForm` hook to the component, and remove all the state and change handlers from the previous example:

```jsx
export const AbsoluteChadForm = (): JSX.Element => {
  const methods = useForm();

  return (
    <form onSubmit={handleSubmit}>
      <Label>
        Username:
        <input type="text" name="username" />
      </Label>
      <Label>
        Password:
        <input type="text" name="password" />
      </Label>
      <Label>
        Email:
        <input type="text" name="fullName" />
      </Label>
    </form>
  );
};
```

Delving deeper into the `methods`objects, this will contain several functions which give control over form behaviour. The methods I’d like to showcase are:

- `register` - registers a field to the form defined by useForm
- `setValue` - programatically sets a input field value by accessing the value’s key name
- `getValues` - returns all non-nullish values entered in the form
- `handleSubmit` - handles submit by taking in callbacks that define how submit is handled, and how errors are handled

Developers will need to call `useForm` per form they want to create e.g. if there are 5 forms on a single page and all the logic is written on a single file, then `useForm` will be called 5 times to handle each form accordingly.

The hook itself can take in an object as a parameter with a set of options that be passed to set the form behaviour. Useful options include:

- Setting the `mode` of the form - the mode determines when form validation will occur e.g if `mode = 'onChange'` then when a connect input field triggers a change event, form validation will occur
- Setting default values of the text field

Let’s add some configuration to the form by defining explicitly the submission mode and the default values for each of the inputs:

```jsx
export const AbsoluteChadForm = (): JSX.Element => {
  const methods = useForm({
    mode: "onSubmit",
    defaultValues: { username: "", password: "", email: "" },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Label>
        Username:
        <input type="text" name="username" />
      </Label>
      <Label>
        Password:
        <input type="text" name="password" />
      </Label>
      <Label>
        Email:
        <input type="text" name="fullName" />
      </Label>
    </form>
  );
};
```

The most important method is the `register` method because it allows a developer to connect an input component to the form defined by `useForm()`. This is because register returns 4 important attributes:

```jsx
const { onChange, onBlur, ref, name } = register("fullName");
```

Similar to when we had the `onChange` handler in our form without the library, this `onChange` function will handle any keyboard events that are fired when focused on the input field. The ref and `onBlur` will be used to manage when the input is focused or not. Finally, `name` is the necessary attribute required to pass values to a HTML form.

This register function can be implemented into the form by deconstructing the object returned by the function and passing them as props to the input fields we have:

```tsx
export const AbsoluteChadForm = (): JSX.Element => {
  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    console.log(methods.getValues());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...methods.register("fullName")} type="text" name="fullName" />
      <input {...methods.register("email")} type="email" name="email" />
      <input
        {...methods.register("password")}
        type="password"
        name="password"
      />
      <input type="submit" value="Submit" />
    </form>
  );
};
```

Let’s look closely at the differences between the previous form using explicit state management from the developer’s side vs a form using react hook form’s managed states.

A clear advantage of using this library is the minimal amount of lines required for a component file because: change and submit handlers can be removed, and useState hooks are not needed. Developers can simply “hook” inputs into the form using the register method (while passing it a reference to the form values that the input field connects to aka `name`).

By allowing developers to simply “hook” into the input fields defined in the form via `useForm` and named references, then you can easily set default values/placeholders without having to manage them for each input manually - the maintenance for user experience is reduced.

## Adding validation with React Hook Forms

The beauty of the `register` function is that it can be used to define validation rules for the input field addressed. For this case, let’s say we want to have validation rules for the password field that are as follows:

- minimum 8 characters
- has an uppercase letter
- has a special character

In the spread operation where `register` is called, validation rules can be added

```tsx
<input
  {...register("fullName", { required: true, minLength: 8, pattern: "" })}
  type="text"
  name="fullName"
/>
```

When the user clicks the submit button, due to the `mode` being set to ‘submit’, validation will be performed on the submit button click, and this involves checking the validation rules defined in the `register` function.

# Delving into the advanced topics

## Using React Hook Forms with component libraries

One great use of React Hook Forms that was useful for my projects has been its integration with component libraries such as Material UI or Chakra UI. Should a development team want to create an MVP with a component library while having easy connection to the React hook form library, then `Controller` is a lifesaver.

`Controller` is a wrapper component that can be used to wrap components and propagate react-hook-form attributes and behaviours down to the components

```tsx
.export const ControlledForm = ():JSX.Element => {

	const methods = useForm(
		{mode: 'onSubmit',
			defaultValues: {
				fullName: '',
				email: '',
				password: '
			}
		})

	const onSubmit = () => {
		console.log(methods.getValues())
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...methods.register('fullName')} type='text' name='fullName' />
			<Controller
			  control={methods.control}
			  name="email"
			  render={({
			    field: { onChange, onBlur, value, name, ref },
			    fieldState: { invalid, isTouched, isDirty, error },
			    formState,
			  }) => (
			    <TextField
						type="text"
						variant="outlined"
						onChange={onChange}
						onBlur={onBlur}
						name={name}
						value={value}
					/>
			  )}
			/>
			<input {...methods.register('password')} type='password' name='password' />
			<input type='submit' value='Submit' />
		</form>
	)
}
```

Although this method is easy to read, as well as being easy to implement, to integrate external components into your application, a cleaner solution can be to use the `useController` hook function instead.

```tsx
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

interface CustomInputProps {
  name: string;
  control: Object;
}

export const CustomInput = ({
  name,
  control,
}: CustomInputProps): JSX.Element => {
  const {
    field: { onChange, onBlur, name, value, ref },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <TextField
      type="text"
      variant="outlined"
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      value={value}
    />
  );
};
```

This will allow developers to keep their code cleaner by adding a hook in the component file rather than having a wrapper on the page file. Apart from the difference being one is a wrapper and the other is a hook, they both have the same behaviour.

The key variables for controlling a component is the `control` variable. This is an object returned by the `register` function with the purpose of registering components to the form created. Accessing the contents inside this variable is not recommended by react-hook-forms.

## Complex Input Behaviour

I’ve mentioned previously that the benefit of react hook forms is that it abstracts handling event listeners on the library side for updating values in input fields and storing them accordingly, but the library is not limited to this abstraction as it allows you to manually set when to trigger event handlers on input fields to update the form values at any time you require.

Recalling the `register` function, rather than deconstructing the function inside an input element, you can define register as so:

```tsx
const { onChange } = register("firstName")

...

<input onChange={onChange} type='text' name='fullName' />
```

If you deconstruct the props before passing it to the input field to connect to the form, you can manually set each individual property that is provided by `register`. The drawback if this approach for a basic form is that you could omit important event handlers provided by the function and you do not get the appropriate behaviour for your form. However, if you need business logic to be run before calling the `onChange` function then you can so, and then call `onChange` with the new formatted input value passed as a parameter.

## Complex Form Components + Reusability

A common issue I have faced in the projects I have worked with is the scalability of forms to accommodate both new form fields, as well as utilising complex form behaviour. To tackle the issue of scalability you need to consider two approaches to building form field components:

1. Creating React Form Field Components that can be reused
2. Creating Field Components with completely different behaviours entirely.

You might ask why you cannot have both approaches in a codebase. You can absolutely do that but in my opinion it makes the codebase look messy. So I recommend trying to split these approaches in two, using some of the underused hooks of React Hook Forms.

### Reusable Components

React Hook Forms has an article dedicated to creating a [“Smart Form Component”](https://react-hook-form.com/advanced-usage#SmartFormComponent), which involves creating a wrapper component with the `useForm` hook called inside, and passing down the form methods to the components, whether it is a handpicked selection of methods or all of them. The result is that you have a wrapper component that injects form methods into the child components inside the wrapper:

```tsx
// From the React Hook Form guide

import React from "react";
import { useForm } from "react-hook-form";

interface FormProps {
	defaultValues: { firstName: string, email: string, password: string },
	children: JSX.Element[],
	onSubmit: () => void,
}

export const Form = ({ defaultValues, children, onSubmit }: FormProps): JSX.Element {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, child => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name
              }
            })
          : child;
       })}
    </form>
  );
}
```

```tsx
import React from "react";
import { Form, Input, Select } from "./Components";

export const SmartForm = (): JSX.Element => {
  const onSubmit = (data) => console.log(data);

  return (
    <Form onSubmit={onSubmit}>
      <input type="text" name="fullName" />
      <input type="email" name="email" />
      <input type="password" name="password" />
      <input type="submit" value="Submit" />
    </Form>
  );
};
```

### Components requiring complex behaviour

If it is the case that a form component will require complex behaviour that should not be reused for a different component, then it is a good idea to understand how to gain access to the form methods and state required. One good hook to use is `useFormContext`which acts very similar to React’s `useContext`. This hook allows you to fetch the form methods provided by `useForm` without having to call the hook again (because if you do, then a new form is initialised).

```tsx
export const AbsoluteChadForm = (): JSX.Element => {
  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    console.log(methods.getValues());
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("fullName")} type="text" name="fullName" />
        <input {...register("email")} type="email" name="email" />
        <input {...register("password")} type="password" name="password" />
        <ComplexBehavingComponent name="complexField" />
        <input type="submit" value="Submit" />
      </form>
    </FormProvider>
  );
};
```

```tsx
interface ComplexBehavingComponentProps {
	name: string
}

export const ComplexBehavingComponent = ({name}: ComplexBehavingComponentProps): JSX.Element => {
	const { register, setValue, getValues } = useFormContext()

	const onChange = (e: ChangeEvent) => {
		if (e.target.value === 'hello world') setValue(name, 'software dev')
	}

	return (
		<input {...register(name, { onChange: onChange }) type='text' name={name} />
	)
}
```

The benefits of this hook is that instead of having to prop drill to lower level components, or if you want to connect components lower in the DOM tree to the Form component at the top level, this is possible using the `FormProvider` wrapper at the level where form data will be sent to children and grand-child props, and then accessed with the `useFormContext` hook.

# Summary

Overall, we have looked at using the basics of React Hook Forms, the advantages it provides as a developer compared with using React’s existing hooks, and have provided examples on how to take advantage of React Hook Form’s utilities for complex form behaviour. Hopefully, this article has inspired you to use the library and make your React forms incredibly effective. For more information on React Hook Forms, see the website for access to the [API documentation](https://react-hook-form.com/api).
