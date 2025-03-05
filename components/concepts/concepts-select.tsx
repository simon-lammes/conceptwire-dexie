import {
	Autocomplete,
	type SxProps,
	TextField,
	type Theme,
} from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/utils/db";

export const ConceptsSelect = ({
	sx,
	selectedConceptIds,
	onSelectedConceptIdsChange,
}: {
	sx?: SxProps<Theme> | undefined;
	selectedConceptIds: string[];
	onSelectedConceptIdsChange: (selectedConcepts: string[]) => void;
}) => {
	const concepts = useLiveQuery(() => db.concepts.toArray());
	return (
		<Autocomplete
			multiple
			id="tags-outlined"
			options={concepts?.map((c) => c.id) ?? []}
			value={selectedConceptIds}
			onChange={(_, selectedConcepts) =>
				onSelectedConceptIdsChange(selectedConcepts)
			}
			getOptionLabel={(option) =>
				concepts?.find((x) => x.id === option)?.title ?? ""
			}
			filterSelectedOptions
			renderInput={(params) => (
				<TextField {...params} label="Linked concepts" />
			)}
			sx={sx}
		/>
	);
};
