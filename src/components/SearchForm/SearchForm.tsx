import { Flex, TextField, Button, Badge, Tooltip } from '@radix-ui/themes';
import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useState, type FormEvent, ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSearchParams } from 'react-router-dom';
import { setSearch } from '@/store/issuesSlice';

function validateSearchString(search: string): boolean {
  const slashRegex = /.+\/.+/;

  if (!slashRegex.test(search)) {
    return false;
  }

  return true;
}

const SearchForm = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({ search: '' });
  const [searchString, setSearchString] = useState('');
  const [hasError, setHasError] = useState(false);

  const onSubmut = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({ search: searchString });

    if (!validateSearchString(searchString)) {
      setHasError(true);
      return;
    }

    dispatch(setSearch(searchString));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasError(false);
    setSearchString(e.target.value);
  };

  const onClear = () => {
    setSearchString('');
    setHasError(false);
  };

  useEffect(() => {
    const search = searchParams.get('search');
    if (searchParams.get('search')) {
      setSearchString(search);
      dispatch(setSearch(search));
    }
  }, []);

  return (
    <form onSubmit={onSubmut}>
      <Flex gap="2">
        <TextField.Root className="flex-1">
          <TextField.Input
            size={{
              initial: '3',
              sm: '2',
            }}
            placeholder="Enter search (e.g user/repo)…"
            value={searchString}
            onChange={onChange}
            {...(hasError && {
              color: 'red',
              variant: 'soft',
            })}
          />
          {hasError && (
            <>
              <TextField.Slot>
                <Tooltip multiline content="Please, enter valid search string e.g 'shapeshift/web'">
                  <Badge color="red" variant="soft">
                    Enter valid search
                  </Badge>
                </Tooltip>
              </TextField.Slot>
              <Flex pr="2" align="center" onClick={onClear}>
                <Cross1Icon cursor="pointer" height={32} />
              </Flex>
            </>
          )}
        </TextField.Root>
        <Button
          size={{
            initial: '3',
            sm: '2',
          }}
          type="submit"
        >
          <MagnifyingGlassIcon width={20} height={20} />
        </Button>
      </Flex>
    </form>
  );
};

export default SearchForm;
