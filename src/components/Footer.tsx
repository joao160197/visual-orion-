export default function Footer() {
    return (
      <footer className="bg-[#1a1a1a] text-white">
        {/* Seção de conteúdo principal */}
        <section className="py-10 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
            
            {/* Logo */}
            <div className="flex flex-col gap-4">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/id%20visual%20%20orion%20-%20logo.png?alt=media&token=9b05ba3a-82b9-4475-9cbe-6b28f101b84a"
                alt="KING Automation"
                className="w-40"
              />
            </div>
  
            {/* Endereço EUA */}
            <div className="text-sm leading-relaxed">
              <h3 className="font-bold mb-2">United States</h3>
              <p>
                4300 Stone Station Rd,<br />
                Roebuck, SC 29376<br />
                Phone: (864) 877-8871<br />
                Fax: (864) 877-9289
              </p>
            </div>
  
            {/* Endereço Brasil */}
            <div className="text-sm leading-relaxed">
              <h3 className="font-bold mb-2">Brazil</h3>
              <p>
                Condomínio Perini Business Park<br />
                Rua Dona Francisca, nº 8300<br />
                Sala 08, Bloco L<br />
                Joinville - SC, 89239-270
              </p>
            </div>
          </div>
        </section>
  
        {/* Seção de direitos autorais */}
        <section className="bg-blue-950 text-center text-sm font-semibold py-6">
          <p className="text-white">Copyright © 2025. All rights reserved.</p>
        </section>
      </footer>
    );
  }
  