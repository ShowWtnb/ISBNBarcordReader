import Scanner from "@/components/elements/barcord_reader/Scanner";
import { validationIsbn } from "@/utils/isbn";
import { Help, HelpOutline } from "@mui/icons-material";
import { Box, Button, Checkbox, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { HtmlTooltip } from "../ToolTip/HtmlTooltip";
import { GetLocalStorage, SaveLocalStorage } from "@/utils/LocalStorage";
import { NextApiResponse } from "next";

const LOCAL_ID = 'ISBN_BARCODE_READER';

export default function BarcodeReader() {
    const [isbn, setIsbn] = useState<number>()
    const [isScannerVisible, setIsScannerVisible] = useState<boolean>(false)
    const [scanError, setScanError] = useState<string>()
    const [json2Notion, setJson2Notion] = useState(JSON_DATA)
    // バーコードリーダーのコールバック
    useEffect(() => {
        if (scanError) {
            toast.error(`Error: ${scanError}`, {
                position: 'top-right',
            })
        }
    }, [scanError])
    function onClickButton(event: any): void {
        setIsScannerVisible(true);
    }
    const [uploadError, setUploadError] = useState<string>()
    function onClickUploadButton(event: any): void {
        // console.log('BarcodeReader onClickUploadButton', event);
        // アップロードする
        if (json2Notion !== undefined && json2Notion.parent.database_id !== undefined && json2Notion.parent.database_id !== 'N/A' && token !== undefined) {
            var res = add_item(json2Notion, token);
            res.then((response: any) => {
                if (response.status !== 200) {
                    console.log('BarcodeReader onClickUploadButton error', response)
                    setUploadError(response?.status + ' ' + response?.statusText)
                }
                setUploadError('')
            }).catch((reason: any) => {
                console.log('BarcodeReader onClickUploadButton error', reason)
                setUploadError(reason?.status + ' ' + reason?.statusText)
            })
        } else {
            console.log('BarcodeReader onClickUploadButton error', json2Notion, json2Notion.parent.database_id, token)
        }
    }
    function onScanCanceled(event: any): void {
        setIsScannerVisible(false);
    }
    function onISBNRead(event: any): void {
        setIsScannerVisible(false);
        setIsbn(event);
    }
    // ISBN
    useEffect(() => {
        // console.log('BarcodeReader isbn', isbn);
        if (isbn !== undefined && validationIsbn(isbn.toString())) {
            // console.log('BarcodeReader isbn',  isbn);
            get_openBD(isbn?.toString()).then((res) => {
                // console.log('BarcodeReader', res);
                setJson2Notion(res);
            })
        }
    }, [isbn])
    useEffect(() => {
        // console.log('BarcodeReader json2Notion', json2Notion);
        // if (json2Notion !== undefined) {

        // }
    }, [json2Notion])
    // DBのID
    function onIsbnTextChanged(event: any): void {
        // console.log('BarcodeReader onIsbnTextChanged', event.target.value);
        setIsbn(event.target.value);
    }
    const [DbId, setDbid] = useState<string>()
    function onDbidTextChanged(event: any): void {
        // console.log('BarcodeReader onDbidTextChanged', event.target.value);
        setDbid(event.target.value);
    }
    const [DBIDChecked, setDBIDChecked] = useState<boolean>(false)
    function handleDBIDCheckBoxChange(event: any): void {
        // console.log('BarcodeReader handleDBIDCheckBoxChange', event.target.checked);
        setDBIDChecked(event.target.checked);
    }
    useEffect(() => {
        if (DBIDChecked) {
            // ローカルストレージに保存する
            if (DbId !== undefined) {
                SaveLocalStorage(LOCAL_ID + 'NOTION_DB_ID', DbId);
            }
        }
        if (DbId !== undefined) {
            json2Notion.parent.database_id = DbId;
            setJson2Notion({ ...json2Notion })
        }
    }, [DbId, DBIDChecked])
    // Token
    const [token, setToken] = useState<string>()
    function onTokenTextChanged(event: any): void {
        // console.log('BarcodeReader onTokenTextChanged', event.target.value);
        setToken(event.target.value);
    }
    const [tokenChecked, setTokenChecked] = useState<boolean>(false)
    function handleTokenCheckBoxChange(event: any): void {
        // console.log('BarcodeReader handleTokenCheckBoxChange', event.target.checked);
        setTokenChecked(event.target.checked);
    }
    useEffect(() => {
        if (tokenChecked) {
            // ローカルストレージに保存する
            if (token !== undefined) {
                SaveLocalStorage(LOCAL_ID + 'NOTION_API_TOKEN', token);
            }
        }
    }, [token, tokenChecked])

    // 初期化
    useEffect(() => {
        var id = GetLocalStorage(LOCAL_ID + 'NOTION_DB_ID');
        if (!(id === undefined || id === null)) {
            setDbid(id);
            setDBIDChecked(true);
            if (id !== undefined) {
                json2Notion.parent.database_id = id;
                setJson2Notion({ ...json2Notion })
            }
        }
        var t = GetLocalStorage(LOCAL_ID + 'NOTION_API_TOKEN');
        if (!(t === undefined || t === null)) {
            setToken(t);
            setTokenChecked(true);
        }
    }, [])

    return (
        <>
            <Box margin={1} textAlign='center'>
                <Grid container spacing={1} alignItems={'center'} alignContent={'center'} justifyContent={'center'}>
                    <Grid item xs={12}>
                        <Box textAlign='center'>
                            <Button variant="outlined" onClick={onClickButton}>Read Barcode</Button>
                        </Box>
                    </Grid>
                    {
                        isScannerVisible ?
                            <></>
                            :
                            <Grid item xs={12}>
                                <Box textAlign='center'>
                                    <TextField id="outlined-basic" label="ISBN" variant="outlined" value={isbn} onChange={onIsbnTextChanged} />
                                </Box>
                            </Grid>
                    }
                    {
                        isScannerVisible ?
                            <></>
                            :
                            <>
                                <Grid item xs={2}>
                                    <Box textAlign='right'>
                                        <HtmlTooltip
                                            title={
                                                <React.Fragment>
                                                    <Typography color="inherit">Notion DB ID</Typography>
                                                    {"How to get DB ID. "}<em>{""}</em> <b>{''}</b><a href="https://booknotion.site/setting-databaseid" target="_blank">look here</a>{'.'}<u>{''}</u>
                                                </React.Fragment>
                                            }
                                        >
                                            <span>
                                                <IconButton disabled>
                                                    <HelpOutline />
                                                </IconButton>
                                            </span>
                                        </HtmlTooltip>
                                    </Box>
                                </Grid>
                                <Grid item xs={8}>
                                    <Box textAlign='center'>
                                        <TextField id="outlined-basic" label="Notion DB ID" variant="outlined" value={DbId} onChange={onDbidTextChanged} />
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box textAlign='left'>
                                        <Tooltip title='**NOT SECURE** Save DB id on browser. Do not turn on on shared computers.' >
                                            <Checkbox color="primary" checked={DBIDChecked} onChange={handleDBIDCheckBoxChange} />
                                        </Tooltip>
                                    </Box>
                                </Grid>
                            </>
                    }
                    {
                        isScannerVisible ?
                            <></>
                            :
                            <>
                                <Grid item xs={2}>
                                    <Box textAlign='right'>
                                        <HtmlTooltip
                                            title={
                                                <React.Fragment>
                                                    <Typography color="inherit">Notion API Token</Typography>
                                                    {"How to get API Token and apply to Notion database. "}<em>{""}</em> <b>{''}</b><a href="https://n-v-l.co/blog/what-is-notion-api#index_MoOg_c8n" target="_blank">look here</a>{'.'}<u>{''}</u>
                                                </React.Fragment>
                                            }
                                        >
                                            <span>
                                                <IconButton disabled>
                                                    <HelpOutline />
                                                </IconButton>
                                            </span>
                                        </HtmlTooltip>
                                    </Box>
                                </Grid>
                                <Grid item xs={8}>
                                    <Box textAlign='center'>
                                        <TextField id="outlined-basic" label="NotionAPI Token" variant="outlined" value={token} onChange={onTokenTextChanged} />
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box textAlign='left'>
                                        <Tooltip title='**NOT SECURE** Save DB id on browser. Do not turn on on shared computers.' >
                                            <Checkbox color="primary" checked={tokenChecked} onChange={handleTokenCheckBoxChange} />
                                        </Tooltip>
                                    </Box>
                                </Grid>
                            </>
                    }
                    {
                        (!isScannerVisible && json2Notion !== undefined && json2Notion?.properties?.title?.title?.at(0)?.text?.content !== 'N/A') ?
                            <>
                                <Grid item xs={10}>
                                    <Box margin={1} sx={{ p: 2, border: '1px solid grey' }}>
                                        <Grid container spacing={1} alignItems={'center'} alignContent={'center'} justifyContent={'center'}>
                                            <Grid item xs={6}>
                                                <Box margin={1} textAlign='right'>
                                                    <Typography>{json2Notion?.properties?.title?.title?.at(0)?.text?.content}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Box margin={1} textAlign='left'>
                                                    <Typography>{json2Notion?.properties?.Authors.multi_select.at(0)?.name}</Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </>
                            :
                            <></>
                    }
                    {
                        isScannerVisible ?
                            <></>
                            :
                            <Grid item xs={12}>
                                <Box textAlign='center'>
                                    <Button variant="contained" onClick={onClickUploadButton}>Upload to Notion</Button>
                                </Box>
                            </Grid>
                    }
                    {
                        isScannerVisible ?
                            <></>
                            :
                            <Grid item xs={12}>
                                <Box textAlign='center'>
                                    <Typography >{uploadError}</Typography>
                                </Box>
                            </Grid>
                    }
                    {
                        isScannerVisible ?
                            <>
                                <Grid item xs={12}>
                                    <Box textAlign='center'>
                                        <Scanner receiveIsbn={onISBNRead} receiveError={setScanError} onCanceled={onScanCanceled} />
                                    </Box>
                                </Grid>
                            </>
                            : <></>
                    }
                </Grid>
            </Box>

        </>
    );
}

const openBD_base = 'https://api.openbd.jp/v1/get?isbn=';
const get_openBD = async (isbn: string) => {
    return new Promise<any>((resolve, reject) => {
        const url = openBD_base + isbn;

        var res = fetch(url, {
            "method": "GET",
        });
        res.then((result) => {
            // console.log('get_openBD', result);
            // resolve(result);
            // return;
            if (result.status != 200) {
                console.log('get_openBD ERROR', result);
                reject(undefined);
                // reject(result);
                return;
            }
            result.json().then((json) => {
                // console.log('get_openBD', JSON.stringify(json));
                const notion_json = convertOpenBD2Notion(json, isbn);
                resolve(notion_json);
                return;
            });
        });
    })
}
// openBDから取得したJsonをNotionに上げられる形に変換する
function convertOpenBD2Notion(a_json: any, isbn?: string) {
    var new_json = JSON.parse(JSON.stringify(JSON_DATA));
    const json = a_json[0];
    // console.log('convertOpenBD2Notion', JSON.stringify(json));

    // console.log('convertOpenBD2Notion', JSON.stringify(json?.summary?.title));
    if (json?.summary?.title != undefined) {
        new_json.properties.title.title = [
            {
                "text": {
                    "content": json.summary.title
                }
            }
        ]
    }

    // console.log('convertOpenBD2Notion', JSON.stringify(json?.onix?.DescriptiveDetail?.Contributor));
    // console.log('convertOpenBD2Notion', JSON.stringify(json?.summary?.author));
    if (json?.onix?.DescriptiveDetail?.Contributor != undefined) {
        var autors = [];
        for (let i = 0; i < json.onix.DescriptiveDetail?.Contributor.length; i++) {
            const element = json.onix.DescriptiveDetail?.Contributor[i];
            const a = element?.PersonName?.content;
            autors.push({ "name": a });
        }
        new_json.properties.Authors.multi_select = autors;
    } else if (json?.summary?.author != undefined) {
        new_json.properties.Authors.multi_select = [{ "name": json.summary.author }];
    }

    new_json.properties.Location.select = { "name": "Home" }

    // console.log('convertOpenBD2Notion', JSON.stringify(json?.summary?.cover));
    if (json?.summary?.cover != undefined) {
        if (json?.summary?.cover != '') {
            new_json.properties.Thumbnail = { "url": json.summary.cover }
        }
    }

    // console.log('convertOpenBD2Notion', JSON.stringify(json?.summary?.isbn));
    if (json?.summary?.isbn != undefined) {
        new_json.properties.ISBN_13.rich_text = [
            {
                "text": {
                    "content": json.summary.isbn
                }
            }
        ]
    } else {
        new_json.properties.ISBN_13.rich_text = [
            {
                "text": {
                    "content": isbn
                }
            }
        ]
    }

    // console.log('convertOpenBD2Notion', JSON.stringify(json?.onix?.PublishingDetail?.PublishingDate?.at(0)?.Date));
    if (json?.onix?.PublishingDetail?.PublishingDate?.at(0)?.Date != undefined) {
        if (json.onix.PublishingDetail.PublishingDate.at(0).Date != '') {
            new_json.properties.Publication.date = {
                "start": json.onix.PublishingDetail.PublishingDate.at(0).Date
            }
        } else {
            new_json.properties.Publication.date = {
                "start": '19000101'
            }
        }
    } else {
        new_json.properties.Publication.date = {
            "start": '19000101'
        }
    }

    // console.log('convertOpenBD2Notion', JSON.stringify(json?.onix?.PublishingDetail?.Publisher?.PublisherName));
    if (json?.onix?.PublishingDetail?.Publisher?.PublisherName != undefined) {
        new_json.properties.Publisher.multi_select = [
            {
                "name": json.onix.PublishingDetail.Publisher.PublisherName
            }
        ]
    }

    // console.log('convertOpenBD2Notion', JSON.stringify(json?.onix?.ProductSupply?.SupplyDetail?.Price?.at(0)?.PriceAmount));
    if (json?.onix?.ProductSupply?.SupplyDetail?.Price?.at(0)?.PriceAmount != undefined) {
        new_json.properties.Price = {
            "number": parseInt(json.onix.ProductSupply.SupplyDetail.Price.at(0).PriceAmount)
        }
    }

    // console.log('convertOpenBD2Notion', JSON.stringify(json?.onix?.CollateralDetail?.TextContent));
    if (json?.onix?.CollateralDetail?.TextContent != undefined) {
        var text = '';
        for (let i = 0; i < json.onix.CollateralDetail.TextContent.length; i++) {
            const element = json.onix.CollateralDetail.TextContent[i];
            text += element.Text + '\n\n'
        }
        new_json.properties.Description.rich_text = [
            {
                "text": {
                    "content": text
                }
            }
        ]
    }

    return new_json;
}
const JSON_DATA = {
    "parent": {
        "type": "database_id",
        "database_id": "N/A"
    },
    "properties": {
        "title": {
            "title": [
                {
                    "text": {
                        "content": "N/A"
                    }
                }
            ]
        },
        "Authors": {
            "multi_select": [
                {
                    "name": "N/A"
                }
            ]
        },
        "Location": {
            "select": {
                "name": "N/A"
            }
        },
        "URL": {
            "url": "N/A"
        },
        "Thumbnail": {
            "url": "N/A"
        },
        "ISBN_13": {
            "rich_text": [
                {
                    "text": {
                        "content": "N/A"
                    }
                }
            ]
        },
        "Publication": {
            "date": {
                "start": "1900-01-01T00:00:00+0000"
            }
        },
        "Publisher": {
            "multi_select": [
                {
                    "name": "N/A"
                }
            ]
        },
        "Price": {
            "number": -1
        },
        "Description": {
            "rich_text": [
                {
                    "text": {
                        "content": "N/A"
                    }
                }
            ]
        }
    }
}
export const add_item = (json_data: object, token: string) => {
    return new Promise<Response>((resolve, reject) => {
        const data = JSON.stringify(json_data);
        // console.log('add_item', data)
        var res = fetch(`${process.env.NEXT_PUBLIC_SITE}/api/notion_api`, {
            "headers": {
                "accept": "application/json",
                "Authorization": `Bearer ${token}`,
                "Content-Type": `application/json`,
                "Notion-Version": `2022-06-28`,
            },
            "method": "POST",
            "body": data
        });
        res.then((response: Response) => {
            if (response.status !== 200) {
                reject(response);
            }
            console.log('add_item', response);
            response.json().then((json) => {
                console.log('add_item json', json);
            })
        })
    });
}