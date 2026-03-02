import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { hashData, sendMetaCAPI, sendGA4MP } from '@/lib/tracking-server';

// Removendo inicialização global para evitar problemas de cache em serverless
// const sql = neon(process.env.DATABASE_URL!);

// Função para enviar notificação por email
async function sendEmailNotification(lead: any) {
    try {
        console.log('--- INICIANDO NOTIFICAÇÃO DE EMAIL ---');
        const host = process.env.EMAIL_HOST;
        const portEnv = process.env.EMAIL_PORT;
        const user = process.env.EMAIL_USER;
        const pass = process.env.EMAIL_PASS;
        const to = process.env.EMAIL_TO;

        if (!host || !portEnv || !user || !pass || !to) {
            return;
        }

        const port = parseInt(portEnv);

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: {
                user,
                pass,
            },
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: 5000, // 5 segundos
            greetingTimeout: 5000,
            socketTimeout: 5000,
        });

        // Formatar número para o link do WhatsApp
        // O frontend envia o número completo com DDI (ex: 5511999999999 ou 12125551234)
        const cleanPhone = lead.whatsapp.replace(/\D/g, '');
        const whatsappLink = `https://wa.me/${cleanPhone}`;

        const mailOptions = {
            from: `"Dr. Tráfego Lead" <${user}>`,
            to,
            subject: `Novo Lead Cadastrado: ${lead.name}`,
            text: `
        Novo lead capturado no site!
        
        Nome: ${lead.name}
        Email: ${lead.email}
        Telefone: ${lead.whatsapp}
        Telefone: ${lead.whatsapp}
        Link WhatsApp: ${whatsappLink}
        
        Origem: ${lead.utm_source || 'N/A'}
        Mídia: ${lead.utm_medium || 'N/A'}
        Campanha: ${lead.utm_campaign || 'N/A'}
        Termo: ${lead.utm_term || 'N/A'}
        Conteúdo: ${lead.utm_content || 'N/A'}
        Página: ${lead.page_path || 'N/A'}
        
        Data: ${new Date().toLocaleString('pt-BR')}
      `,
            html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #0066cc;">Novo Lead Capturado! 🚀</h2>
          <p>Um novo cliente em potencial acabou de se cadastrar no site.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Nome:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${lead.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>WhatsApp:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <a href="${whatsappLink}" style="color: #0066cc; text-decoration: none; font-weight: bold;" target="_blank">
                  ${lead.whatsapp}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;"><strong>Origem (UTM):</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;">${lead.utm_source || '-'} / ${lead.utm_medium || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;"><strong>Campanha:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;">${lead.utm_campaign || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;"><strong>Termo:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;">${lead.utm_term || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;"><strong>Conteúdo:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;">${lead.utm_content || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;"><strong>Página:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; background-color: #f9f9f9;">${lead.page_path || '-'}</td>
            </tr>
             <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Data:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${new Date().toLocaleString('pt-BR')}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">Este é um email automático enviado pelo sistema do site Dr. Tráfego.</p>
        </div>
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email de notificação enviado:', info.messageId);

    } catch (error) {
        console.error('Erro ao enviar email de notificação:', error);
    }
}

// Função para escrever o cabeçalho
async function writeHeader(sheets: any, spreadsheetId: string) {
    const header = [['id', 'name', 'email', 'whatsapp', 'created_at', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'page_path']];
    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'A1',
        valueInputOption: 'RAW',
        requestBody: { values: header },
    });
}

// Função para garantir que o cabeçalho exista na planilha
async function ensureHeader(sheets: any, spreadsheetId: string) {
    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'A1:E1', // Verifica a primeira linha
        });

        // Se a primeira linha estiver vazia, escreve o cabeçalho
        if (!res.data.values || res.data.values.length === 0) {
            await writeHeader(sheets, spreadsheetId);
        }
    } catch (error) {
        // Se a planilha estiver completamente vazia, a leitura pode falhar (lança um erro).
        // Nesse caso, assumimos que o cabeçalho não existe e o criamos.
        await writeHeader(sheets, spreadsheetId);
    }
}

// Função principal que envia os dados para a planilha
async function appendToSheet(lead: any) {
    try {
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;
        const client_email = process.env.GOOGLE_CLIENT_EMAIL;
        const private_key = process.env.GOOGLE_PRIVATE_KEY;

        if (!spreadsheetId || !client_email || !private_key) {
            throw new Error(`Configuração incompleta: ${!spreadsheetId ? 'GOOGLE_SHEET_ID ' : ''}${!client_email ? 'GOOGLE_CLIENT_EMAIL ' : ''}${!private_key ? 'GOOGLE_PRIVATE_KEY' : ''} faltando.`);
        }

        // 1. Autenticação
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email,
                private_key: private_key.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // 2. Garante que o cabeçalho exista
        await ensureHeader(sheets, spreadsheetId);

        // 3. Prepara os dados na ordem correta
        const values = [
            [
                lead.id,
                lead.name,
                lead.email,
                lead.whatsapp,
                lead.created_at,
                lead.utm_source || '',
                lead.utm_medium || '',
                lead.utm_campaign || '',
                lead.utm_term || '',
                lead.utm_content || '',
                lead.page_path || ''
            ],
        ];

        // 4. Envia os dados para a planilha
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'A1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values,
            },
        });
        console.log('Lead salvo com sucesso no Google Sheets.');
        return { success: true };
    } catch (error: any) {
        console.error('Erro ao salvar lead no Google Sheets:', error);
        throw error; // Propaga o erro para ser capturado no POST
    }
}

// Função assíncrona para salvar no banco (para rodar em background)
async function saveToNeon(lead: any) {
    try {
        console.log('Tentando salvar no Neon (Nova Instância):', {
            name: lead.name,
            email: lead.email,
            phone: lead.phone
        });

        // Inicializa o cliente Neon DENTRO da função para garantir conexão fresca
        const sql = neon(process.env.DATABASE_URL!);

        // 1. Definir organization_id e column_id diretamente (Otimização: Evita SELECT extra e erros de tabela)
        // Organization ID: 8f6eed8c-ce0d-472e-9531-aa4e76149be0 (Dona Domestica mar26)
        // Column ID (Novos Leads): 7feb3df5-07dd-4219-b02e-eba72f4bfbf7
        const organizationId = '8f6eed8c-ce0d-472e-9531-aa4e76149be0';
        const columnId = '7feb3df5-07dd-4219-b02e-eba72f4bfbf7';

        console.log(`Usando IDs Fixos - Organization: ${organizationId}, Column: ${columnId}`);

        /* 
        // CÓDIGO ANTERIOR (DINÂMICO) - REMOVIDO POR CAUSAR LENTIDÃO E ERRO DE TABELA INEXISTENTE
        const configQuery = await sql`...`;
        */

        // 2. Inserir Lead com os campos obrigatórios
        // Definimos status como 'Novo' e usamos os IDs recuperados

        // Auto-Migration Temporária: Adicionar coluna utm_content caso não exista
        await sql`ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS utm_content text;`;

        // Removido ON CONFLICT pois a tabela não tem constraint UNIQUE no email
        const result = await sql`
            INSERT INTO public.leads (
                name, email, whatsapp, created_at, 
                status, column_id, organization_id,
                utm_source, utm_medium, utm_campaign, utm_term, utm_content, page_path
            )
            VALUES (
                ${lead.name}, ${lead.email}, ${lead.phone}, ${lead.created_at}, 
                'Novo', ${columnId}, ${organizationId},
                ${lead.utm_source || null}, ${lead.utm_medium || null}, ${lead.utm_campaign || null}, ${lead.utm_term || null}, ${lead.utm_content || null}, ${lead.page_path || null}
            )
            RETURNING *;
        `;

        if (!result || result.length === 0) {
            throw new Error('O comando INSERT rodou mas não retornou nenhum dado. Verifique permissões RLS ou triggers.');
        }

        // 3. Contar quantos leads existem na tabela (para prova de inserção)
        const countResult = await sql`SELECT count(*) FROM leads`;
        const totalCount = countResult[0].count;

        const savedLead = result[0];
        console.log('SUCESSO NEON! Lead salvo/atualizado:', savedLead);

        // Extrai o host da URL para rastreamento
        const dbUrl = process.env.DATABASE_URL || '';
        const host = dbUrl.split('@')[1]?.split('/')[0] || 'Desconhecido';

        return { ...savedLead, _meta: { host, count: totalCount } };
    } catch (error) {
        console.error('Erro detalhado ao salvar no Neon:', error);
        throw error;
    }
}


// Função auxiliar de timeout
const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
    let timeoutId: NodeJS.Timeout;
    const timeoutPromise = new Promise<T>((_, reject) => {
        timeoutId = setTimeout(() => {
            reject(new Error(`Operação abortada por timeout após ${ms}ms`));
        }, ms);
    });

    return Promise.race([
        promise.finally(() => clearTimeout(timeoutId)),
        timeoutPromise
    ]);
};

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        console.log('--- INICIANDO PROCESSAMENTO DE LEAD (Versão: Produção Estável) ---');
        const { name, email, phone, utm_source, utm_medium, utm_campaign, utm_term, utm_content, page_path, fbc: fbcFromBody, fbp: fbpFromBody } = await request.json();

        if (!name || !email || !phone) {
            return NextResponse.json({ message: 'Nome, email e telefone são obrigatórios.' }, { status: 400 });
        }

        // Cria um objeto unificado para o lead inicial
        const initialLead = {
            name,
            email,
            phone,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_term,
            utm_content,
            page_path,
            created_at: new Date().toISOString(),
        };

        // Primeiro, tenta salvar no banco de dados com TIMEOUT (5s)
        let savedLead;

        try {
            console.log('Iniciando tentativa de salvar no Neon...');
            savedLead = await withTimeout(saveToNeon(initialLead), 5000);
        } catch (dbError: any) {
            console.error('⚠️ FALHA OU TIMEOUT NO NEON:', dbError);

            // Cria um objeto de backup
            savedLead = {
                id: 'backup_timeout_' + Date.now(),
                name: initialLead.name,
                email: initialLead.email,
                whatsapp: initialLead.phone,
                created_at: initialLead.created_at,
                utm_source: initialLead.utm_source,
                utm_medium: initialLead.utm_medium,
                utm_campaign: initialLead.utm_campaign,
                utm_term: initialLead.utm_term,
                utm_content: initialLead.utm_content,
                page_path: initialLead.page_path
            };
        }

        // 3. Executar tarefas secundárias em PARALELO (Sheets e Email)
        // Isso reduz o tempo de espera do usuário, pois não esperamos um terminar para começar o outro.
        // O await Promise.all garante que o servidor não encerre antes de terminar o envio.
        // ADICIONADO TIMEOUT GLOBAL PARA TAREFAS SECUNDÁRIAS (4 segundos)
        try {
            console.log('Iniciando tarefas de background (Tracking) com timeout de 4s...');

            // Preparar dados para Tracking Server-Side
            const userAgent = request.headers.get('user-agent') || '';
            const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip') || '';
            const fbc = fbcFromBody || request.cookies.get('_fbc')?.value;
            const fbp = fbpFromBody || request.cookies.get('_fbp')?.value;

            // Hashing sensitive data for Meta
            const hashedEmail = await hashData(email);
            const hashedPhone = await hashData(phone);
            const firstName = name.split(' ')[0];
            const hashedFirstName = await hashData(firstName);

            // Event ID for deduplication
            const eventId = (savedLead as any).id || Date.now().toString();

            const origin = request.headers.get('origin') || 'https://lp.donnadomesticas.com.br';
            const capiUserData = {
                em: hashedEmail,
                ph: hashedPhone,
                fn: hashedFirstName,
                ip,
                ua: userAgent,
                fbc,
                fbp,
                event_source_url: origin + '/obrigado'
            };

            const trackingPromises = [
                // Meta CAPI — Lead
                sendMetaCAPI('Lead', capiUserData,
                    { content_name: 'Inscrição Casa Organizada' },
                    eventId
                ),
                // Meta CAPI — CompleteRegistration (para marcações de conversão por evento no Meta)
                sendMetaCAPI('CompleteRegistration', capiUserData,
                    { content_name: 'Inscrição Casa Organizada', status: 'Success' },
                    `cr_${eventId}`
                ),
                // GA4 Measurement Protocol
                sendGA4MP('generate_lead', email, {
                    method: 'contact_form',
                    page_location: page_path || '/',
                    utm_source,
                    utm_medium,
                    utm_campaign,
                    utm_content
                })
            ];

            await withTimeout(Promise.all(trackingPromises), 4000);
            console.log('Tarefas de background concluídas com sucesso.');
        } catch (bgError) {
            console.error('Alerta: Tarefas secundárias (Tracking) demoraram muito ou falharam:', bgError);
            // Não lançamos erro aqui para não falhar a resposta ao usuário, já que o lead foi salvo no banco.
        }

        // Retorna sucesso
        return NextResponse.json({
            message: 'Lead processado com sucesso.',
            lead: savedLead
        }, { status: 200 });

    } catch (error: any) {
        console.error('Erro ao processar a requisição:', error);
        return NextResponse.json({
            message: 'Erro interno do servidor.',
            error: error.message || String(error)
        }, { status: 500 });
    }
}
