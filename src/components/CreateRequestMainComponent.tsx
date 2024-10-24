import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Button, TextInput, Label } from "flowbite-react";
import { HiPlus, HiTrash, HiX } from "react-icons/hi";

const UrlRegex = /^(http?:\/\/)(drive\.google\.com)\/([-a-zA-Z0-9()@:%_\+.~#?&//=]+)/;
const UrlDriveSplit = "http://drive.google.com/";

interface URLFieldComponentProps {
  id: string;
  index: number;
  canDelete: boolean;
  setUrl: (id: string, url: string) => void;
  onDelete: (id: string) => void;
}
function URLFieldComponent(props: URLFieldComponentProps) {
  const [url, setUrl] = useState('');
  const [dirty, setDirty] = useState(false);
  const error = useMemo(
    () => {
      if (!dirty && !url) return '';
      if (!UrlRegex.test(url)) return 'Enter a valid URL';
      return '';
    }, [url, dirty]
  );

  return (
    <div className="w-[672px] max-w-[80vw]">
      <Label
        htmlFor={`url-${props.id}`}
        className="font-semibold"
        value={`Video/Folder URL ${props.index + 1}`}
        color={error ? "failure" : undefined}
      />
      <div className="mt-2 relative flex flex-col w-full group">
        <TextInput
          className="w-full [&_input]:pr-10"
          type="url"
          id={`url-${props.id}`}
          placeholder="e.g http://drive.google.com/some-link"
          value={url}
          required
          color={error ? "failure" : undefined}
          helperText={error}
          onChange={(event) => {
            setUrl(event.currentTarget.value);
            setDirty(true);
            props.setUrl(props.id, event.currentTarget.value);
          }}
        />
        <Button
          className="invisible group-hover:visible group-hover:bg-transparent absolute top-2.5 right-3 bg-transparent [&>span]:bg-transparent [&>span]:p-0.5"
          pill
          outline
          disabled={!props.canDelete}
          onClick={() => props.onDelete(props.id)}
        >
          <HiTrash className="w-3 h-3" style={{ color: '#11192880' }} />
        </Button>


      </div>
    </div>
  );
}

interface URLAlertData {
  url: string,
  value: string,
}

interface URLFieldData {
  id: string,
  url: string,
}

type URLFieldAction = {
  type: 'insert';
  id: string;
} | {
  type: 'remove';
  id: string;
} | {
  type: 'update';
  id: string;
  value: string;
};

interface CreateRequestMainComponentProps {
}
export function CreateRequestMainComponent(
  props: CreateRequestMainComponentProps
) {
  const [focusedId, setFocusedId] = useState('');
  const [urls, dispatch] = useReducer(
    (state: URLFieldData[], action: URLFieldAction) => {
      switch (action.type) {
        case 'insert':
          return [
            ...state, {
              id: action.id,
              url: '',
            }
          ];

        case 'remove':
          return state.filter(u => u.id != action.id);

        case 'update':
          const url = state.find(u => u.id === action.id);
          if (url) url.url = action.value;
          return [...state];
      }
    },
    [
      {
        id: '7ec63bc4-769b-4065-b75c-09012be59a83',
        url: '',
      }
    ]
  );

  const anyUrlIsInvalidOrEmpty = useMemo(() => urls.filter(u => !u.url || !UrlRegex.test(u.url)).length > 0, [urls]);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const onDelete = useCallback(
    (id: string) => {
      dispatch(
        {
          type: 'remove',
          id,
        }
      );
    },
    [urls]
  );

  const onInsertUrl = useCallback(
    () => {
      const id = crypto.randomUUID();
      dispatch(
        {
          type: 'insert',
          id,
        }
      );
      setFocusedId(id);
    },
    [urls]
  );

  useEffect(
    () => {
      if (!focusedId) return;
      const input = document.getElementById(`url-${focusedId}`);
      if (input == null) return;
      input.focus();
      addButtonRef.current?.scrollIntoView();
    },
    [focusedId]
  )

  const onSubmit = () => {
    const message: URLAlertData[] = urls.map(_url => { return { url: _url.url, value: _url.url.split(UrlDriveSplit)[1] } });
    alert(JSON.stringify(message))
  }

  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex items-center justify-between p-[24px] border-b rounded-t">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-extrabold">
          Create New Request
        </h3>
        <button
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <HiX className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-col p-6 grow items-center overflow-y-auto">
        <div className="space-y-6 grow">
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
              Add videos or folders
            </h4>
            <p className="text-sm text-gray-900 dark:text-gray-400">
              These videos would be cut, labeled and made available in your
              Recharm video library
            </p>
          </div>

          {
            urls.map((url, index) => (
              <URLFieldComponent
                key={url.id}
                id={url.id}
                index={index}
                canDelete={urls.length > 1}
                setUrl={(id, value) => {
                  dispatch(
                    {
                      type: 'update',
                      id,
                      value,
                    }
                  );
                }}
                onDelete={onDelete}
              />
            ))
          }

          <div>
            <Button
              ref={addButtonRef}
              color="light"
              disabled={urls.length >= 10}
              className="text-sm font-semibold hover:text-purple-800 bg-white hover:bg-gray-50 border border-gray-300"
              onClick={onInsertUrl}
            >
              <span className="flex items-center">
                <span className="bg-purple-800 rounded-full p-0.5 mr-2">
                  <HiPlus className="h-3 w-3 text-white" />
                </span>
                Add URL
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b">
        <Button
          color="primary"
          className="text-sm text-white font-semibold bg-purple-700 hover:bg-purple-800"
          disabled={anyUrlIsInvalidOrEmpty}
          onClick={onSubmit}
        >
          <span className="flex items-center">
            <span className="p-0.5 mr-1">
              <HiPlus className="h-[14px] w-[14px] text-white" />
            </span>
            Create Request
          </span>
        </Button>
      </div>
    </div>
  );
}
