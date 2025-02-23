"use client";

import React from "react";
import { Input } from "./input";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const TimePicker = ({ value, onChange }: TimePickerProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <Input
      type="time"
      value={value}
      onChange={handleChange}
      className="rounded-xl"
    />
  );
};
