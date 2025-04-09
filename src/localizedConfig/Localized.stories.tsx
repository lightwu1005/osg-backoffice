// LocalizedDemo.tsx
import React, {useState} from 'react';
import {Box, Button, Divider, Stack, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import dayjs from 'dayjs';
import {useLanguage} from '@/localizedConfig/LanguageContext';
import type {Meta, StoryObj} from "@storybook/react";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const LanguageSwitcher = () => {
    const {switchLocale} = useLanguage();

    return (
        <Box>
            <Button onClick={() => switchLocale('en')}>English</Button>
            <Button onClick={() => switchLocale('zh')}>中文</Button>
        </Box>
    );
};

type DateByDaysProps = {
    page: string;
};

const DateByDaysComponent = ({page}: DateByDaysProps) => {
    const intl = useIntl();
    const now = dayjs();
    const past = dayjs().subtract(1, 'day');

    const timeAgo = now.diff(past, 'day') > 0
        ? intl.formatMessage({id: `${page}.daysAgo`, defaultMessage: '{days} days ago'}, {days: now.diff(past, 'day')})
        : intl.formatMessage({
            id: `${page}.hoursAgo`,
            defaultMessage: '{hours} hours ago'
        }, {hours: now.diff(past, 'hour')});

    return <div>{timeAgo}</div>;
};

const DateByIntlComponent = () => {
    const intl = useIntl();
    const daysAgo = intl.formatRelativeTime(-3, 'day');
    const hoursAgo = intl.formatRelativeTime(3, 'hour');

    return (
        <Box>
            <Stack direction="row" spacing={1}>
                <Typography variant="h6">{daysAgo}</Typography>
                <Typography variant="h6">{hoursAgo}</Typography>
            </Stack>
        </Box>
    );
};

interface StringFormattedProps {
    page: string;
    num: number;
    item: string;
}

const StringFormattedComponent = ({page, num, item}: StringFormattedProps) => {
    const intl = useIntl();
    const message = intl.formatMessage({id: `${page}.itemCount`}, {num, item});

    return <Box>{message}</Box>;
};

interface PluralComponentProps {
    page: string;
    leftCount: number;
}

const PluralComponent = ({page, leftCount}: PluralComponentProps) => {
    const intl = useIntl();
    const message = intl.formatMessage({id: `${page}.leftCount`}, {leftCount});

    return <Box>{message}</Box>;
};

function LocalizedDemo() {
    const intl = useIntl();
    const [page, setPage] = useState('demoEx');

    const handlePageChange = () => {
        setPage(prevPage => prevPage === 'demo' ? 'demoEx' : 'demo');
    };

    return (
        <Stack direction="column" spacing={4} justifyContent="space-between">
            <Typography>{intl.formatMessage({id: `${page}.title`})}</Typography>
            <Stack direction="row" spacing={2}>
                <DateByDaysComponent page={page}/>
                <Divider orientation="vertical" flexItem sx={{backgroundColor: 'primary.main'}}/>
                <DateByIntlComponent/>
            </Stack>
            <Divider/>
            <Stack direction="row" spacing={2}>
                <StringFormattedComponent page={page} num={5} item="Apple(s)"/>
            </Stack>
            <Divider/>
            <Stack direction="row" spacing={2}>
                <PluralComponent page={page} leftCount={1}/>
                <Divider orientation="vertical" flexItem sx={{backgroundColor: 'primary.main'}}/>
                <PluralComponent page={page} leftCount={5}/>
            </Stack>
            <Divider/>
            <Stack direction="column" spacing={1}>
                <Stack direction="row" spacing={1}>
                    <Typography color="red">翻譯檔切換</Typography>
                    <Button onClick={handlePageChange}
                            variant="outlined">{page === 'demo' ? '切换到demoEx' : '切换到demo'}</Button>
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Typography color="red">語系切換</Typography>
                    <LanguageSwitcher/>
                </Stack>
            </Stack>
        </Stack>
    );
}

const meta = {
    component: LocalizedDemo,
    parameters: {
        layout: 'centered',
    },
    tags: [],
    argTypes: {},
} satisfies Meta<typeof LocalizedDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: StoryObj<typeof LocalizedDemo> = {
    render: (args) => (
        <ProvidersWithoutNavigation>
            <LocalizedDemo/>
        </ProvidersWithoutNavigation>
    )
};