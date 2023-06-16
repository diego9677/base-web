import clsx from "clsx";
import { useState } from 'react';
import { Input } from "./input";

type Item = {
  label: string;
  value: number;
};

type ListProps = {
  titleAll: string;
  title: string;
  data: Item[];
  selected: number[];
  onSelectItem: (selected: number[]) => void;
  onAllClick: () => void;
  onDoubleClickItem: (id: number) => void;
};

type Props = {
  id?: string;
  label?: string;
  error?: string;
  options: Item[];
  selected: number[];
  onChange: (selected: number[]) => void;
};

const List = ({ title, titleAll, data, selected, onSelectItem, onAllClick, onDoubleClickItem }: ListProps) => {
  const [filter, setFilter] = useState('');

  const filteredList = () => data.filter(d => d.label.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));

  return (
    <section className="flex flex-col gap-2">
      <h5 className="px-2 bg-gray-200 text-sm text-gray-800">
        {title}
      </h5>
      <header className="px-2">
        <Input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Buscar..." />
      </header>
      <ul className="px-2 overflow-auto h-44">
        {filteredList().map((d, i) => (
          <li
            key={i}
            className={clsx('select-none p-0.5 text-sm text-gray-700 font-normal cursor-pointer', selected.includes(d.value) ? 'bg-gray-200' : 'hover:bg-gray-200')}
            onDoubleClick={() => onDoubleClickItem(d.value)}
            onClick={() => {
              if (selected.includes(d.value)) {
                const ids = selected.filter((sel) => sel !== d.value);
                onSelectItem(ids);
              } else {
                onSelectItem([...selected, d.value]);
              }
            }}
          >
            {d.label}
          </li>
        ))}
      </ul>
      <footer className="flex justify-center items-center border-t">
        <button
          type="button"
          className="outline-none text-sm font-medium text-gray-800 hover:font-semibold hover:text-orange-primary"
          onClick={onAllClick}
        >
          {titleAll}
        </button>
      </footer>
    </section>
  );
};

export const MultiSelectCompare = ({ id, label, error, options, selected, onChange }: Props) => {
  const [addSelectValues, setAddSelectValues] = useState<number[]>([]);
  const [removeSelectValues, setRemoveSelectValues] = useState<number[]>([]);

  const onAdd = () => {
    onChange([...selected, ...addSelectValues]);
    setAddSelectValues([]);
  };

  const onRemove = () => {
    const ids = selected.filter(id => !removeSelectValues.includes(id));
    onChange(ids);
    setRemoveSelectValues([]);
  };

  const onAddAll = () => {
    const ids = options.map((d) => d.value);
    onChange(ids);
    setAddSelectValues([]);
  };

  const onRemoveAll = () => {
    onChange([]);
    setRemoveSelectValues([]);
  };

  const onDoubleClickAddItem = (id: number) => {
    onChange([...selected, id]);
    setAddSelectValues([]);
  };

  const onDoubleClickRemoveItem = (id: number) => {
    const ids = selected.filter(s => s !== id);
    onChange(ids);
    setRemoveSelectValues([]);
  };


  const onAddSelectItem = (selected: number[]) => {
    setAddSelectValues(selected);
  };

  const onRemoveSelectItem = (selected: number[]) => {
    setRemoveSelectValues(selected);
  };
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-gray-800">
          {label}
        </label>
      )}
      <section className="flex gap-2 items-center" id={id}>
        <div className="flex-1 border rounded-md">
          <List
            title="Disponible"
            titleAll="Seleccionar todos"
            data={options.filter(o => !selected.includes(o.value))}
            selected={addSelectValues}
            onSelectItem={onAddSelectItem}
            onAllClick={onAddAll}
            onDoubleClickItem={onDoubleClickAddItem}
          />
        </div>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            className="outline-none text-gray-800 text-sm hover:text-orange-primary border p-1 shadow-md rounded-md"
            onClick={onAdd}
          >
            <i className="las la-arrow-right la-lg" />
          </button>
          <button
            type="button"
            className="outline-none text-gray-800 text-sm hover:text-orange-primary border p-1 shadow-md rounded-md"
            onClick={onRemove}
          >
            <i className="las la-arrow-left la-lg" />
          </button>
        </div>
        <div className="flex-1 border rounded-md">
          <List
            title="Elegidos"
            titleAll="Quitar todos"
            data={options.filter(o => selected.includes(o.value))}
            selected={removeSelectValues}
            onSelectItem={onRemoveSelectItem}
            onAllClick={onRemoveAll}
            onDoubleClickItem={onDoubleClickRemoveItem}
          />
        </div>
      </section>
      {error && (
        <span>
          {error}
        </span>
      )}
    </div>
  );
};