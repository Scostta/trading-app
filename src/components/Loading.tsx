import { Box, BoxProps, Spinner } from "@chakra-ui/react"

export const Loading = ({ loadingPos, ...rest }: BoxProps & { loadingPos?: "relative" | "absolute" }): JSX.Element => {

    return <Box w="full" h="full" display="flex" justifyContent="center" alignItems="center" {...rest}>
        <Spinner size="xl" color="white" position={loadingPos} />
    </Box>
}