import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import {Stack} from "@mui/material";
import Marquee from "@/modules/components/general/Marquee";

const meta: Meta<typeof Marquee> = {
    component: Marquee,
    parameters: {
        // layout: 'centered',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        text: `
        一見你就有好心情 不用暖身就會開心
因為眼睛耳朵都有了默契 你知道我有多麼瞭解你
有你就有好心情 像夏天吃著冰淇淋
因為想法感受都有了感應 每個眼神都變成了動力
如果世界是一片汪洋森林 我選擇和你同一棵樹棲息
不用懷疑 我就是那麼在乎你
如果愛情會讓人脆弱無力 朋友卻可以讓人恢復元氣
不用懷疑 你就是有這種魔力
我知道 是上天安排我們 在這時刻相遇在一起
我們都被祝福 常常有好心情 oh, yeah-yeah
一見你就有好心情 不用暖身就會開心
因為眼睛耳朵都有了默契 你知道我有多麼瞭解你
有你就有好心情 像夏天吃著冰淇淋
因為想法感受都有了感應 每個眼神都變成了動力
我知道 是上天安排我們 在這時刻相遇在一起
我們都被祝福 常常有好心情 oh, yeah-yeah
一見你就有好心情 不用暖身就會開心
因為眼睛耳朵都有了默契 你知道我有多麼瞭解你
有你就有好心情 像夏天吃著冰淇淋
因為想法感受都有了感應 每個眼神都變成了動力
一見你就有好心情 不用暖身就會開心
因為眼睛耳朵都有了默契 你知道我有多麼瞭解你
有你就有好心情 像夏天吃著冰淇淋
因為想法感受都有了感應 每個眼神都變成了動力
Some boys kiss me, some boys hug me
I think they're OK
If they don't give me proper credit
I just walk away
They can beg, and they can plead
But they can't see the light, that's right
'Cause the boy with the cold hard cash
Is always mister right
'Cause we're living in a material world
And I am a material girl
You know that we are living in a material world
And I am a material girl
Some boys romance, some boys slow dance
That's all right with me
If they can't raise my interest then I
Have to let them be
Some boys try and some boys lie but
I don't let them play (no way)
Only boys that save their pennies
Makes my rainy day
'Cause we're living in a material world
And I am a material girl
You know that we are living in a material world
And I am a material girl
Living in a material world
And I am a material girl
You know that we are living in a material world
And I am a material girl
Living in a material world
Living in a material world
Living in a material world
Living in a material world
Boys may come and boys may go
And that's all right you see
Experience has made me rich
And now they're after me
'Cause everybody's living in a material world
And I am a material girl
You know that we are living in a material world
And I am a material girl
        `,
        alignTop: 0,
        alignLeft: 0,
        color: '#FFFFFF'
    },
    render: (args) => {
        return (
            <Stack spacing={'0.125rem'}>
                <Marquee {...args} />
            </Stack>
        );
    },
};