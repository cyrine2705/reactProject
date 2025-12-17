import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{
            textAlign: 'center',
            padding: '2rem',
            marginTop: 'auto',
            borderTop: '1px solid var(--border-color)',
            color: 'var(--text-secondary)'
        }}>
            <p>&copy; {new Date().getFullYear()} ReactProject. Created by <strong>Cyrine Srairi</strong>.</p>
        </footer>
    );
};

export default Footer;
