-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "is_simple" TEXT NOT NULL,
    "parent_id" TEXT NOT NULL,
    "cod" TEXT NOT NULL,
    "digital" TEXT NOT NULL,
    "produto" TEXT NOT NULL,
    "produto_url" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "url_download" TEXT NOT NULL,
    "link_externo" TEXT NOT NULL,
    "caracteristicas" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "especificacoes" TEXT NOT NULL,
    "itens_inclusos" TEXT NOT NULL,
    "garantia" TEXT NOT NULL,
    "peso" TEXT NOT NULL,
    "comprimento" TEXT NOT NULL,
    "largura" TEXT NOT NULL,
    "altura" TEXT NOT NULL,
    "valor_promo" TEXT NOT NULL,
    "data_promo_de" TEXT NOT NULL,
    "data_promo" TEXT NOT NULL,
    "multiplo" TEXT NOT NULL,
    "equivalencia" JSONB,
    "equivalencia_tamanho" TEXT NOT NULL,
    "equivalencia_cor" TEXT NOT NULL,
    "equivalencia_fundo" TEXT NOT NULL,
    "ativo" TEXT NOT NULL,
    "venda" TEXT NOT NULL,
    "oculto" TEXT NOT NULL,
    "frete_gratis" TEXT NOT NULL,
    "palavras_substitutas" TEXT NOT NULL,
    "prazo_producao" TEXT NOT NULL,
    "categorias_adicionais" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "tipo_fotos" TEXT NOT NULL,
    "ncm" TEXT NOT NULL,
    "mpn" TEXT NOT NULL,
    "gtin" TEXT NOT NULL,
    "genero" JSONB,
    "modelagem" JSONB,
    "grupo_etario" JSONB,
    "marca" TEXT[],
    "atributos" TEXT NOT NULL,
    "tabela_preco" JSONB NOT NULL,
    "campos_adicionais" TEXT NOT NULL,
    "curtidas" TEXT NOT NULL,
    "quantidade_total_em_estoque" TEXT NOT NULL,
    "grade_tipo" TEXT NOT NULL,
    "selos" TEXT NOT NULL,
    "relacionados" TEXT NOT NULL,
    "campo_anotacao" TEXT NOT NULL,
    "valor_unidade_tipo" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "created" TEXT NOT NULL,
    "updated" TEXT NOT NULL,
    "estoque_cor_id" TEXT NOT NULL,
    "estoque_id" TEXT NOT NULL,
    "tabela_medidas" JSONB,
    "permite_embalagem" TEXT NOT NULL,
    "permite_arquivo" TEXT NOT NULL,
    "permite_recorrencia" TEXT NOT NULL,
    "valores_base" JSONB NOT NULL,
    "seo_title" TEXT NOT NULL,
    "seo_description" TEXT NOT NULL,
    "seo_metatags" TEXT NOT NULL,
    "seo_scripts" TEXT NOT NULL,
    "seo_banner" JSONB,
    "nome_cor" TEXT NOT NULL,
    "formato_cor" TEXT NOT NULL,
    "termo_agrupador" TEXT NOT NULL,
    "total_comentarios" TEXT NOT NULL,
    "comentarios_media" TEXT NOT NULL,
    "marketplace_has_outros_anuncios" TEXT NOT NULL,
    "campos_adicionais_raw" TEXT NOT NULL,
    "categoria_level1" JSONB NOT NULL,
    "categoria_level2" JSONB NOT NULL,
    "categoria_level3" JSONB NOT NULL,
    "google_category" TEXT NOT NULL,
    "site_category" TEXT NOT NULL,
    "embalagem" JSONB,
    "combo" TEXT[],
    "personalizador" TEXT[],
    "isPromo" TEXT NOT NULL,
    "cat_add" TEXT NOT NULL,
    "biquini" TEXT[],
    "produto_online" TEXT NOT NULL,
    "adicional_info" TEXT[],
    "url_relative" TEXT NOT NULL,
    "url_absolute" TEXT NOT NULL,
    "isChild" TEXT NOT NULL,
    "is_schedule" TEXT NOT NULL,
    "estoque" JSONB[],
    "quantidade_total_variacoes" TEXT NOT NULL,
    "fotos" JSONB[],
    "quantidade_total_visualizacoes" TEXT NOT NULL,
    "loja" JSONB NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");