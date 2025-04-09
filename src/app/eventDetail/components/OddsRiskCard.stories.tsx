import {Meta, StoryObj} from '@storybook/react';
import OddsRiskCard from "@/app/eventDetail/components/OddsRiskCard";
import {mockOddsDataList} from "@/data/mockData/event/MockEventDetailData";
import {mockConfigurationData} from "@/data/mockData/channel/MockChannelData";
import {ProvidersWithoutNavigation} from "@/utils/Providers";

const meta: Meta<typeof OddsRiskCard> = {
    component: OddsRiskCard,
    tags: ["autodocs"],
    argTypes: {
        provider: {description: 'odd name', control: 'text'},
        isPreferred: {description: 'is preferred odd', control: 'boolean'},
        odds: {description: 'odds data', control: 'object'},
        configuration: {description: 'configuration data', control: 'object'},
        handlePreference: {action: 'handlePreference'},
        handlePriceChange: {action: 'handlePriceChange'}
    },
    decorators: [
        (Story) => (
            <ProvidersWithoutNavigation>
                <Story/>
            </ProvidersWithoutNavigation>
        )
    ]
} as Meta<typeof OddsRiskCard>;
export default meta;

type Story = StoryObj<typeof meta>;

const mockArgs = mockOddsDataList[0];
const configArgs = mockConfigurationData;

export const Preference: Story = {
    args: {
        ...mockArgs,
        isPreferred: true,
        configuration: configArgs,
        marketName: '1x2',
        handlePreference: (provider) => {
        },
        handlePriceChange: (provider, betId, price, oldPrice) => {
        }
    }
};

export const UnPreference: Story = {
    args: {
        ...mockOddsDataList[1],
        isPreferred: false,
        marketName: '1x2',
        configuration: configArgs,
        handlePreference: (provider) => {
        },
        handlePriceChange: (provider, betId, price, oldPrice) => {
        }
    }
};
