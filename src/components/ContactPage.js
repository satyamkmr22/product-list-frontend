import React from "react";
import "../css/Contact.css";
import photo from '../assets/photo.jpg';

// Define individual contact card component
const ContactCard = ({ name, image, contact, email, description }) => {
  return (
    <div className="contact-card">
      <img src={image} alt={name} className="contact-image" />
      <img src={image} alt={name} className="contact-avatar" />
      <div className="contact-content">
        <div className="contact-title">{name}</div>
        <div className="contact-info">Contact: {contact}</div>
        <div className="contact-info">Email: {email}</div>
        <div className="contact-description">{description}</div>
      </div>
    </div>
  );
};

// Define main contact page component
const ContactPage = () => {
  const contacts = [
    {
      name: "Satyam Kumar",
      image: photo, // Corrected this line
      contact: "+91 76679 67100",
      email: "satyamkmr22@iitk.ac.in",
      description: "Developed Official Website of Antaragni'24",
    }
    // Add more contacts as needed
  ];

  return (
    <div className="contact-page">
      {contacts.map((contact, index) => (
        <ContactCard key={index} {...contact} />
      ))}
    </div>
  );
};

export default ContactPage;