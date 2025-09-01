import { render, screen } from '@testing-library/react';
import Card from '../../ui/Card';

describe('Card', () => {
  test('renders children correctly', () => {
    render(
      <Card>
        <h2>Test Content</h2>
      </Card>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders as article when specified', () => {
    render(
      <Card as="article">
        <h2>Article Content</h2>
      </Card>
    );
    
    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(
      <Card className="custom-class">
        <h2>Test Content</h2>
      </Card>
    );
    
    const card = screen.getByText('Test Content').parentElement;
    expect(card).toHaveClass('custom-class');
  });
});