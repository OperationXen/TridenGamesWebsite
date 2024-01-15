import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import RealmSelector from "../../components/game/RealmSelector";
import VariantSelector from "../../components/game/VariantSelector";
import TierSelector from "../../components/game/TierSelector";
import DateTimeSelector from "../../components/game/DateTimeSelector";

let url = "http://127.0.0.1:8000/api/games/";

export default function GamePage() {
  const formik = {
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
      code: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
      dateTime: Yup.date().required().min(new Date(), "Game start must be in the future"),
      dateTimePatreonRelease: Yup.date().label('Patreon Release').required().test(("dateTimePatreonRelease", (value, context) => {
        if (value.getTime() >= context.parent.dateTime.getTime()) {
          return context.createError({ path: "dateTimePatreonRelease", message: ({ label }) => `${label} must be before Game Time` });
        }
        return true;
      })),
      dateTimeOpenRelease: Yup.date().label('General Release').required().test(("dateTimeOpenRelease", (value, context) => {
        if (value.getTime() >= context.parent.dateTime.getTime()) {
          return context.createError({ path: "dateTimeOpenRelease", message: ({ label }) => `${label} must be before Game Time` });
        }
        if (value.getTime() <= context.parent.dateTimePatreonRelease.getTime()) {
          return context.createError({ path: "dateTimeOpenRelease", message: ({ label }) => `${label} must be after Patreon Release` });
        }
        return true;
      }))
    }),
    initialValues: {
      name: "",
      code: "",
      realm: "faerun",
      variant: "resAL",
      description: "",
      maxPlayers: 6,
      tier: 1,
      minLevel: 1,
      maxLevel: 4,
      warnings: "",
      streaming: false,
      dateTime: new Date(),
      dateTimePatreonRelease: new Date(),
      dateTimeOpenRelease: new Date(),
      length: "4 hours",
      ready: true

    },
    onSubmit: (values) => {
      console.info("This is only called if validation passes");
      console.info("SUBMITTING", values)
    }
  };

  return (
    <Formik {...formik}>
      <GameForm />
    </Formik>
  );
}

function GameForm() {

  const { values, errors, handleSubmit, handleChange, setFieldValue } = useFormikContext();

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "grid",
          flexDirection: "column wrap",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField name="name" value={values.name} onChange={handleChange} label="Game Name" error={!!errors.name} helperText={errors.name} sx={{ minWidth: "16em" }} />
        <TextField name="code" value={values.code} onChange={handleChange} label="Module Code" error={!!errors.code} helperText={errors.code} sx={{ minWidth: "16em" }} />
        <Box sx={{ display: "flex", minWidth: "16em" }}>
          <RealmSelector />
          <VariantSelector />
        </Box>
        <TextField
          name="description"
          multiline
          fullWidth
          minRows={4}
          value={values.description}
          onChange={handleChange}
          label="Description"
        />
        <Box sx={{ display: "flex", minWidth: "16em" }}>
          <TextField
            value={values.maxPlayers}
            onChange={handleChange}
            label="Players"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TierSelector />
        </Box>
        <FormControlLabel control={<Checkbox checked={values.streaming} />} label="Streaming" onChange={(evt) => setFieldValue("streaming", evt.target.checked)} />
        <DateTimeSelector label="Game Start" name="dateTime" />
        <DateTimeSelector label="Patreon Release" name="dateTimePatreonRelease" />
        <DateTimeSelector label="General Release" name="dateTimeOpenRelease" />
        <FormControlLabel control={<Checkbox checked={values.ready} />} label="Ready" onChange={(evt) => setFieldValue("ready", evt.target.checked)} />
        <Button variant="outlined" type="submit">
          Create Game
        </Button>
      </Box>
    </form>
  );
}
