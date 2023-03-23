import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

const data = [
  {
    client: 'MetaCubes',
    description: 'LookFar onboarding and project setup',
    time: '2:00',
    date: dayjs().format('MM/DD/YYYY')
  },
  {
    client: 'MetaCubes',
    description: 'LookFar onboarding and project setup',
    time: '2:00',
    date: dayjs().format('MM/DD/YYYY')
  },
  {
    client: 'MetaCubes',
    description: 'LookFar onboarding and project setup',
    time: '2:00',
    date: dayjs().format('MM/DD/YYYY')
  }
];
const Invoice = () => {
  const [pdf, setPdf] = useState<string | null>(null);

  const createInvoice = async () => {
    let currentDate: string | null = null;
    const doc: TDocumentDefinitions = {
      content: [
        {
          columns: [
            { width: '*', text: 'Andrew Landis', },
            { width: '*', text: 'INVOICE #4', alignment: 'right' }
          ],
          marginBottom: 10,
          style: 'titleRow'
        },
        { text: 'Date: 02/05/2023', alignment: 'right', marginBottom: 20 },
        {
          columns: [
            { width: '*', text: 'Bill To: MetaCubes', fontSize: 15 },
            { width: '*', text: 'Balance Due: $1,980.00', alignment: 'right', fontSize: 15 }
          ],
          marginBottom: 20
        },
        {
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: [100, '*', 50],
            body: [
              ['Date', 'Description', { text: 'Time', alignment: 'center' }],
              ...data.map((entry) => {
                if (currentDate !== entry.date) {
                  currentDate = entry.date;
                  return [entry.date, entry.description, { text: entry.time, alignment: 'center' }];
                }

                return ['', entry.description, { text: entry.time, alignment: 'center' }];
              })
            ]
          },
          marginBottom: 20
        },
        'Total Time 6:00',
        'Rate $50 / hr',
        'Total $300'
      ],
      defaultStyle: {
        fontSize: 12
      },
      styles: {
        titleRow: {
          fontSize: 20
        }
      }
    };

    const pdfDocGenerator = pdfMake.createPdf(doc);
    pdfDocGenerator.getDataUrl((data) => setPdf(data));
  };

  useEffect(() => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    createInvoice();
  }, []);

  return (
    <div id="invoice-page">
      <div>
        <form>
          <div id="invoice-form">
            <input type="date" />
            <input type="date" />
            <select>
              <option value={1}>Client One</option>
              <option value={2}>Client Two</option>
              <option value={3}>Client Three</option>
            </select>
          </div>
        </form>
      </div>
      <div id="pdf-frame">
        {pdf ? <iframe src={pdf} height="100%" width="100%" /> : 'Loading...'}
      </div>
    </div>
  );
};

export default Invoice;