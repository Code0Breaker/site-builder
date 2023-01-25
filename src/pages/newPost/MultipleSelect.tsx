import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

export function MultipleSelectCategories({title, names, category, setCategory}:{title:string, names:any,category:string[], setCategory:(state:string[])=>void,}) {
    const theme = useTheme();
  
    const handleChange = (event: SelectChangeEvent<typeof category>) => {
      const {
        target: { value },
      } = event;
      setCategory(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
    return (
      <div>
        <FormControl fullWidth>
          <InputLabel id="demo-multiple-name-label">{title}</InputLabel>
          <Select
            fullWidth
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={category}
            onChange={handleChange}
            input={<OutlinedInput label={title} />}
            MenuProps={MenuProps}
          >
            {names.map((name:any) => (
              <MenuItem
                key={name}
                value={name.id}
                style={getStyles(name, category, theme)}
              >
                {name.translates[0].title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }

  export function MultipleSelectTags({title, names, category, setCategory}:{title:string, names:any,category:string[], setCategory:(state:string[])=>void,}) {
    const theme = useTheme();
  
    const handleChange = (event: SelectChangeEvent<typeof category>) => {
      const {
        target: { value },
      } = event;
      setCategory(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
    return (
      <div>
        <FormControl fullWidth>
          <InputLabel id="demo-multiple-name-label">{title}</InputLabel>
          <Select
            fullWidth
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={category}
            onChange={handleChange}
            input={<OutlinedInput label={title} />}
            MenuProps={MenuProps}
          >
            {names.map((name:any) => (
              <MenuItem
                key={name}
                value={name.id}
                style={getStyles(name, category, theme)}
              >
                {name.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }