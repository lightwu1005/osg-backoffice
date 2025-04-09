import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MicrosoftLoginButton from './MicrosoftLoginButton';
import { useMsal } from '@azure/msal-react';
import '@testing-library/jest-dom';

jest.mock('@azure/msal-react', () => ({
    useMsal: jest.fn()
}));

const mockMsalInstance = {
    loginRedirect: jest.fn(),
    acquireTokenSilent: jest.fn(),
    logoutPopup: jest.fn()
};

mockMsalInstance.acquireTokenSilent.mockResolvedValue({ accessToken: 'mockedAccessToken' });

const mockAccount = { name: 'User', username: 'user@example.com' };
const nonEmptyAccountsArray = [mockAccount];

describe('MicrosoftLoginButton', () => {
    beforeEach(() => {
        mockMsalInstance.loginRedirect.mockReset();
        mockMsalInstance.acquireTokenSilent.mockReset();
        mockMsalInstance.logoutPopup.mockReset();
        mockMsalInstance.acquireTokenSilent.mockResolvedValue({ accessToken: 'mockedAccessToken' });
    });

    it('renders login button for unauthenticated users', () => {
        (useMsal as jest.Mock).mockReturnValue({
            instance: mockMsalInstance,
            accounts: []
        });

        const { container } = render(<MicrosoftLoginButton />);
        const loginButton = container.querySelector('img[alt="MSLogo"]');
        expect(loginButton).toBeInTheDocument();
    });

    it('renders logout button for authenticated users', () => {
        (useMsal as jest.Mock).mockReturnValue({
            instance: mockMsalInstance,
            accounts: nonEmptyAccountsArray
        });

        const { getByText } = render(<MicrosoftLoginButton />);
        expect(getByText('Logout Microsoft Account')).toBeInTheDocument();
    });

    it('calls login function on login button click', async () => {
        (useMsal as jest.Mock).mockReturnValue({
            instance: mockMsalInstance,
            accounts: []
        });

        const { container } = render(<MicrosoftLoginButton />);
        const loginButton = container.querySelector('img[alt="MSLogo"]')!;
        fireEvent.click(loginButton);
        await waitFor(() => expect(mockMsalInstance.loginRedirect).toHaveBeenCalled());
    });

    it('calls logout function on logout button click', async () => {
        (useMsal as jest.Mock).mockReturnValue({
            instance: mockMsalInstance,
            accounts: nonEmptyAccountsArray
        });

        const { getByText } = render(<MicrosoftLoginButton />);
        fireEvent.click(getByText('Logout Microsoft Account'));
        await waitFor(() => expect(mockMsalInstance.logoutPopup).toHaveBeenCalled());
    });
});
