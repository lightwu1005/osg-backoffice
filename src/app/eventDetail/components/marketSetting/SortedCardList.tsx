import React, { useState, useEffect } from 'react';
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Stack, Typography } from "@mui/material";
import { SortedCard } from "@/app/eventDetail/components/marketSetting/SortedCard";

export interface SortedCardListProps {
    title: string;
    listItems: string[];
    disabled?: boolean;
    onChange: (e: string[]) => void;
}

export default function SortedCardList(props: SortedCardListProps) {
    const { title, onChange, listItems, disabled } = props;
    const [items, setItems] = useState<string[]>(listItems);

    useEffect(() => {
        setItems(listItems);
    }, [listItems]);

    const dragEndEvent = (e: DragEndEvent) => {
        const { over, active } = e;
        if (over && active.id !== over.id) {
            const newArr = arrayMove(items, items.indexOf(active.id as string), items.indexOf(over.id as string));
            setItems(newArr);
            onChange(newArr);
        }
    };

    return (
        <Stack direction={"column"}>
            <Typography variant={'h4'}>{title}</Typography>
            <DndContext onDragEnd={dragEndEvent}>
                <SortableContext items={items} disabled={disabled}>
                    {items.map((item, index) => (
                        <SortedCard key={item} isFirst={index === 0} id={item} disabled={disabled}/>
                    ))}
                </SortableContext>
            </DndContext>
        </Stack>
    );
}