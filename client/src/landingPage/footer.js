import React from 'react';

const links = [
  { name: 'Quality Care', link: '#' },
  { name: 'Compassionate Service', link: '#' },
  { name: 'Convenient Location', link: '#' },
  { name: 'Comprehensive Services', link: '#' },
  { name: 'Expert Treatment', link: '#' },
  { name: 'Personalized Attention', link: '#' },
  { name: 'Innovative Therapies', link: '#' },
  { name: 'Coordinated Care', link: '#' },
  { name: 'Contact Us', link: '#' },
  { name: 'Emergency Services', link: '#' },
  { name: 'Patient Safety', link: '#' },
  { name: 'Women\'s Health', link: '#' },
  { name: 'Specialty Care', link: '#' },
  { name: 'Pediatrics', link: '#' },
  { name: 'Geriatrics', link: '#' },
  { name: 'Community Outreach', link: '#' },
  { name: 'Educational Resources', link: '#' },
];

const Footer = () => {
  const firstCol = links.slice(0, 5);
  const secondCol = links.slice(5, 9);
  const thirdCol = links.slice(9, 13);
  const fourthCol = links.slice(13);

  return (
    <footer className="footer">
      <p>Questions? Call +254 701 102994</p>
      <div className="footer-cols">
        <ul>
          {firstCol.map((link) => {
            <li key={link.name}>
              <a href={link.link}>{link.name}</a>
            </li>
          })}
        </ul>
        <ul>
          {secondCol.map((link) => {
            <li key={link.name}>
              <a href={link.link}>{link.name}</a>
            </li>
          })}
        </ul>
        <ul>
          {thirdCol.map((link) => {
            <li key={link.name}>
              <a href={link.link}>{link.name}</a>
            </li>
          })}
        </ul>
        <ul>
          {fourthCol.map((link) => {
            <li key={link.name}>
              <a href={link.link}>{link.name}</a>
            </li>
          })}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
