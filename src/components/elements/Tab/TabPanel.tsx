import { Box, Typography } from "@mui/material";

export interface TabPanelProps {
    children?: any;
    index: any;
    value: any;
}

export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {/* <Typography>{children}</Typography> */}
                    {/*
                        // サンプルではchildrenに渡されるのが文字要素なのでTypographyで囲ってよいが、
                        // 文字要素以外のコンポーネントを渡すとpの中にdivが含まれているHydration failedが起こる
                        // https://v4.mui.com/ja/components/tabs/
                    */}
                    {children}
                </Box>
            )}
        </div>
    );
}
