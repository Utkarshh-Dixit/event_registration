import React, { useState, useEffect } from "react";

const useValidation = (values) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validate = () => {
      const newErrors = {};
      if (!values.name) newErrors.name = "Name is required";
      if (!values.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(values.email))
        newErrors.email = "Email is invalid";
      if (!values.age || values.age <= 0)
        newErrors.age = "Age must be greater than 0";
      if (values.attendingWithGuest && !values.guestName)
        newErrors.guestName = "Guest Name is required";
      setErrors(newErrors);
    };

    validate();
  }, [values]);

  return errors;
};

const EventRegistrationForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    age: "",
    attendingWithGuest: false,
    guestName: "",
  });

  const errors = useValidation(formValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      alert(`Form submitted:\n${JSON.stringify(formValues, null, 2)}`);
    } else {
      alert("Please fix the errors before submitting");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
        </label>
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formValues.age}
            onChange={handleChange}
          />
        </label>
        {errors.age && <span>{errors.age}</span>}
      </div>
      <div>
        <label>
          Are you attending with a guest?
          <input
            type="checkbox"
            name="attendingWithGuest"
            checked={formValues.attendingWithGuest}
            onChange={handleChange}
          />
        </label>
      </div>
      {formValues.attendingWithGuest && (
        <div>
          <label>
            Guest Name:
            <input
              type="text"
              name="guestName"
              value={formValues.guestName}
              onChange={handleChange}
            />
          </label>
          {errors.guestName && <span>{errors.guestName}</span>}
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default EventRegistrationForm;
