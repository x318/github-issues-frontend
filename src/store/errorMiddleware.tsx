import toast from 'react-hot-toast';
import { Callout } from '@radix-ui/themes';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';

const errorMap: Record<number, (message?: string) => string> = {
  500: () => 'Sorry, somethhing went wrong :(',
  404: (message) => message,
};

const getErrorMessage = (code: number, message: string) => {
  return errorMap[code]?.(message) ?? errorMap[500]();
};

const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    // eslint-disable-next-line no-console
    console.warn('Got a rejected action!');
    toast.custom(
      <Callout.Root variant="soft" color="red">
        <Callout.Icon>
          <CrossCircledIcon color="red" />
        </Callout.Icon>
        <Callout.Text>{getErrorMessage(action.payload.data?.code, action.payload.data?.message)}</Callout.Text>
      </Callout.Root>,
      { position: 'bottom-right' },
    );
  }

  return next(action);
};

export default rtkQueryErrorLogger;
