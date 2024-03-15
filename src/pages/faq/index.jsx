import React from 'react';
import { IoMdSearch } from 'react-icons/io';
import { Drawer, ButtonToolbar, Button, Input, Dropdown } from 'rsuite';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './style.scss';
import 'rsuite/dist/rsuite-no-reset.min.css';

const Faq = () => {
  const [openWithHeader, setOpenWithHeader] = React.useState(false);

  return (
    <div className="Faq-container">
      <div className="faq-search">
        <h1>Welcome! How can we help?</h1>
        <div className="input">
          <input type="text" placeholder="Search" />
          <IoMdSearch size={28} />
        </div>
      </div>

      <div className="faq-button">
        <ButtonToolbar>
          <Button onClick={() => setOpenWithHeader(true)}>Contact Us</Button>
        </ButtonToolbar>

        <Drawer open={openWithHeader} onClose={() => setOpenWithHeader(false)} className='drawer'>
          <Drawer.Body  style={{ display:'flex', flexDirection: 'column', gap: '24px'}}>
            <div className="contact-us"  style={{ boxShadow:'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',borderRadius:'20px', width: '100%', display:'flex', flexDirection: 'column', justifyContent: 'center', gap:'24px', padding:'28px' }}>
                <div className="heading" style={{ width: '100%', display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
                    <h2>Contact Us</h2>
                </div>
                <div className="contact-form" style={{ width: '100%', display:'flex', flexDirection: 'column', justifyContent: 'center', gap:'24px' }}>
                    <div className="category" style={{ display:'flex', gap:'24px' }}>
               <p>Category</p>
               <Dropdown title="Choose category">
                    <Dropdown.Item>Counsellor</Dropdown.Item>
                    <Dropdown.Item>Webinar</Dropdown.Item>
                    <Dropdown.Item>Vocational Courses</Dropdown.Item>
                    <Dropdown.Item>Accomodation</Dropdown.Item>
                </Dropdown>
                </div>
                <div className="query" style={{ display:'flex',flexDirection:'column',gap:'8px' }}>
                    <p>Query</p>
                    <Input as="textarea" rows={3} placeholder="Enter query" />
                </div>
                <div className="submit" style={{ display:'flex',cursor: 'pointer',backgroundColor:'var(--primary-dark)',padding:'8px', justifyContent: 'center',alignItems:'center'}}>
                    Submit
                </div>
                </div>
            </div>
            <h2>FAQs</h2>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Accordion Title 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Accordion Content 1</Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Accordion Title 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Accordion Content 2</Typography>
              </AccordionDetails>
            </Accordion>
          </Drawer.Body>
        </Drawer>
      </div>
    </div>
  );
};

export default Faq;
