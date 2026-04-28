// LÓGICA DE FRONT-END
        let totalSeconds = 0;
        let mainTimerInterval = null;
        let topics = [];
        let activeTopicId = null;

        const formatTime = (s) => {
            const h = Math.floor(s / 3600);
            const m = Math.floor((s % 3600) / 60);
            const sec = s % 60;
            return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
        };

        const renderTopics = () => {
            const container = document.getElementById('topics-list');
            document.getElementById('topic-count').innerText = `${topics.length} tópicos`;
            container.innerHTML = topics.length === 0 ? `<p class="text-center py-10 text-slate-400 italic">Adicione tópicos para começar a pauta.</p>` : '';
            
            topics.forEach(t => {
                const isActive = activeTopicId === t.id;
                const div = document.createElement('div');
                div.className = `topic-item ${t.completed ? 'topic-completed' : isActive ? 'topic-active' : ''}`;
                
                div.innerHTML = `
                    <div class="flex items-center gap-4">
                        <button class="toggle-complete text-xl ${t.completed ? 'text-emerald-500' : 'text-slate-300'}">
                            <i class="fas ${t.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
                        </button>
                        <div>
                            <div class="font-semibold text-slate-800 ${t.completed ? 'line-through opacity-50' : ''}">${t.title}</div>
                            <div class="text-[11px] font-mono font-bold text-indigo-500 uppercase tracking-tight">${formatTime(t.seconds)}</div>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        ${!t.completed ? `
                            <button class="focus-btn text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}">
                                ${isActive ? 'Focando' : 'Focar'}
                            </button>
                        ` : ''}
                        <button class="delete-btn text-slate-300 hover:text-rose-500 px-2">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;

                div.querySelector('.toggle-complete').onclick = () => {
                    t.completed = !t.completed;
                    if(activeTopicId === t.id) activeTopicId = null;
                    renderTopics();
                };

                const focusBtn = div.querySelector('.focus-btn');
                if (focusBtn) {
                    focusBtn.onclick = () => {
                        activeTopicId = (activeTopicId === t.id) ? null : t.id;
                        renderTopics();
                    };
                }

                div.querySelector('.delete-btn').onclick = () => {
                    topics = topics.filter(item => item.id !== t.id);
                    if(activeTopicId === t.id) activeTopicId = null;
                    renderTopics();
                };

                container.appendChild(div);
            });
        };

        document.getElementById('main-btn').onclick = () => {
            const icon = document.getElementById('main-icon');
            const statusLabel = document.getElementById('status-label');

            if (mainTimerInterval) {
                clearInterval(mainTimerInterval);
                mainTimerInterval = null;
                icon.className = 'fas fa-play';
                statusLabel.innerText = "Pausado";
            } else {
                mainTimerInterval = setInterval(() => {
                    totalSeconds++;
                    document.getElementById('total-timer').innerText = formatTime(totalSeconds);
                    if (activeTopicId) {
                        const t = topics.find(i => i.id === activeTopicId);
                        if(t) { t.seconds++; renderTopics(); }
                    }
                }, 1000);
                icon.className = 'fas fa-pause';
                statusLabel.innerText = "Reunião em andamento...";
            }
        };

        document.getElementById('add-topic-btn').onclick = () => {
            const input = document.getElementById('topic-input');
            const title = input.value.trim();
            if (title) {
                topics.push({ id: Date.now(), title, seconds: 0, completed: false });
                input.value = '';
                renderTopics();
            }
        };

        document.getElementById('reset-btn').onclick = () => {
            if (confirm("Deseja zerar o cronômetro e a pauta?")) location.reload();
        };

        document.getElementById('finish-btn').onclick = async () => {
            if (totalSeconds === 0) return alert("O cronômetro não foi iniciado.");

            const participants = document.getElementById('participants-input').value || "Não informado";
            const type = document.getElementById('meeting-type').value;
            const notes = document.getElementById('notes-area').value;

            let topicsSummary = topics.map(t => `- [${formatTime(t.seconds)}] ${t.title} ${t.completed ? '(OK)' : ''}`).join('\n');
            const report = `🏁 RESUMO DA REUNIÃO\n----------------------\n👥 Participantes: ${participants}\n📅 Tipo: ${type}\n⏱ Duração Total: ${formatTime(totalSeconds)}\n\n📋 Tópicos:\n${topicsSummary || "Nenhum tópico registrado."}\n\n📝 Notas:\n${notes || "Nenhuma nota."}`;

            try { await navigator.clipboard.writeText(report); } 
            catch (err) {
                const textArea = document.createElement("textarea");
                textArea.value = report;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            const box = document.getElementById('message-box');
            box.style.opacity = '1';
            box.style.transform = 'translateX(-50%) translateY(0)';
            
            setTimeout(() => {
                box.style.opacity = '0';
                box.style.transform = 'translateX(-50%) translateY(1rem)';
                if(mainTimerInterval) document.getElementById('main-btn').click();
                totalSeconds = 0; topics = []; activeTopicId = null;
                document.getElementById('total-timer').innerText = "00:00:00";
                document.getElementById('participants-input').value = '';
                document.getElementById('notes-area').value = '';
                renderTopics();
            }, 3000);
        };

        renderTopics();

        