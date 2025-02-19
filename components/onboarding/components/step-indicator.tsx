import React from 'react';
import { cn } from '@/src/lib';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  size?: number;
  strokeWidth?: number;
  isLast?: boolean;
}

const StepIndicator = ({
  currentStep,
  totalSteps,
  size = 80,
  strokeWidth = 6,
  isLast,
}: StepIndicatorProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const fillPercentage = (currentStep / totalSteps) * 100;
  const dashOffset = circumference - (circumference * fillPercentage) / 100;

  return (
    <div className='relative inline-flex items-center justify-center'>
      <svg width={size} height={size}>
        <title>Step Indicator</title>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke='currentColor'
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          className='text-gray-300'
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke='currentColor'
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className={cn(
            'transition-all duration-300 ease-in-out',
            isLast ? 'text-secondary' : 'text-primary'
          )}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className='absolute inset-0 flex items-center justify-center'>
        <span className='text-sm font-medium' aria-live='polite'>
          {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
};

export default StepIndicator;
